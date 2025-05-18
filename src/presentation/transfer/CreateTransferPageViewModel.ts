import { OrganizationApiDataSource } from "@/data/datasource/api/OrganizationApiDataSource";
import { OrganizationRepositoryDataSource } from "@/data/repository/OrganizationRepositoryDataSource";
import { GetOrganizations } from "@/domain/usecase/GetOrganizations";
import { useCallback, useEffect, useMemo } from "react";

export default function CreateTransferPageViewModel() {
  const organizationDataSource = useMemo(() => new OrganizationApiDataSource(), [])
  const organizationRepository = useMemo(() => new OrganizationRepositoryDataSource(organizationDataSource), [organizationDataSource])

  const createTransferUseCase = useMemo(() => new GetOrganizations(organizationRepository), [organizationRepository])
  const getOrganizations = useCallback(async () => {
    return await createTransferUseCase.invoke()
  }, [createTransferUseCase])

  useEffect(() => {
    console.log(getOrganizations())
  }, [getOrganizations()])

  return {

  }
}
