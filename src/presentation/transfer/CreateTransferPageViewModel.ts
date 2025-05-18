import { useApiRequest } from "@/core/hooks/useApiRequest";
import { OrganizationApiDataSource } from "@/data/datasource/api/OrganizationApiDataSource";
import { OrganizationRepositoryDataSource } from "@/data/repository/OrganizationRepositoryDataSource";
import { Organization } from "@/domain/model/organization/Organization";
import { GetOrganizations } from "@/domain/usecase/GetOrganizations";
import { useCallback, useEffect, useMemo } from "react";

export default function CreateTransferPageViewModel() {
  const organizationDataSource = useMemo(() => new OrganizationApiDataSource(), [])
  const organizationRepository = useMemo(() => new OrganizationRepositoryDataSource(organizationDataSource), [organizationDataSource])

  const createTransferUseCase = useMemo(() => new GetOrganizations(organizationRepository), [organizationRepository])
  const getOrganizations = useCallback(async () => {
    return await createTransferUseCase.invoke()
  }, [createTransferUseCase])
  const {
    list: organizations,
    isLoading: organizationsIsLoading,
    error: organizationsError,
    execute: fetchOrganizations
  } = useApiRequest<Organization, []>(getOrganizations)

  useEffect(() => {
    fetchOrganizations()
  }, [fetchOrganizations])

  return {
    organizations,
    organizationsIsLoading,
    organizationsError,
    fetchOrganizations
  }
}
