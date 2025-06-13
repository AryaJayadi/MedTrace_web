import { useApiRequest } from "@/core/hooks/useApiRequest"
import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource"
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource"
import { GetHistoryDrug } from "@/domain/usecase/history/GetHistoryDrug"
import { useCallback, useEffect, useMemo } from "react"
import { TimelineData } from "./TimelineData"
import { useAuth } from "../context/AuthContext"
import { formatDateLong } from "@/lib/utils"
import { JSX } from "react/jsx-runtime"
import { errorListResponse, successListResponse } from "@/lib/ResponseHelper"
import { Organization } from "@/domain/model/organization/Organization"

export default function TraceDrugQRPageViewModel(drugID: string, icon: JSX.Element) {
  const {
    user,
    otherOrgs,
  } = useAuth()

  const drugDataSource = useMemo(() => new DrugApiDataSource(), [])
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource])
  const getHistoryDrugUseCase = useMemo(() => new GetHistoryDrug(drugRepository), [drugRepository])
  const fetchDrugHistory = useCallback(async (orgs: Organization[]) => {
    const histories = await getHistoryDrugUseCase.execute(drugID)
    if (!histories.success || histories.list === undefined) return errorListResponse(500, "An error occurred while fetching timeline data.")
    if (orgs.length === 0) return errorListResponse(400, "Organizaiton is missing.")

    const models = histories.list.map(o => (
      {
        date: formatDateLong(o.Timestamp),
        organization: `Owner: ${orgs.find(org => org?.ID === o.Drug.OwnerID)?.Name || "-"}.`,
        location: o.Drug.Location ? `Location: ${o.Drug.Location}` : "N/A",
        type: o.IsDelete ? "Deleted" : "Updated/Created",
        batchID: o.Drug.BatchID,
        icon: icon,
      }
    )) as TimelineData[]

    return successListResponse(models)
  }, [getHistoryDrugUseCase])

  const {
    list: drugHistoryFromApi,
    isLoading,
    error: apiError,
    execute: triggerFetchDrugHistory,
    success: fetchSuccess,
  } = useApiRequest<TimelineData, [Organization[]]>(fetchDrugHistory)

  useEffect(() => {
    if (user !== null && otherOrgs.length > 0) triggerFetchDrugHistory([user, ...otherOrgs])
  }, [user, otherOrgs])

  return {
    drugHistoryFromApi,
    isLoading,
    apiError,
    fetchSuccess
  }
}
