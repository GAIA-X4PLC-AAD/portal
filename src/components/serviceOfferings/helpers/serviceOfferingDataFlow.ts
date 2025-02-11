import BusinessObjectsNotFound from '../../../common/errorHandling/exceptions/BusinessObjectsNotFound';
import MultipleBusinessObjectsFound from '../../../common/errorHandling/exceptions/MultipleBusinessObjectsFound';
import { CypherQueryApiService as cypherQuery } from '../../../services/cypherQueryApiService';
import { ServiceOffering, ServiceOfferingDetails } from '../../../types/serviceOfferings.model';

export const loadServiceOfferings = async (): Promise<ServiceOffering[]> => {
  try {
    const cypherQueryResult = await cypherQuery.getServiceOfferings();
    console.log(cypherQueryResult.items);
    return cypherQueryResult.items;
  } catch (error) {
    console.error('Error fetching service-offerings:', error);
    throw error;
  }
}

export const loadServiceOfferingDetails = async (uri: string): Promise<ServiceOfferingDetails> => {
  try {
    const cypherQueryResult = await cypherQuery.getServiceOfferingDetails(uri);

    if (cypherQueryResult.items.length === 0) {
      throw new BusinessObjectsNotFound(`Software resources with the given uri: '${uri}', does not exist!`, uri);
    }

    if (cypherQueryResult.items.length > 1) {
      throw new MultipleBusinessObjectsFound(`Multiple software resources exist with the given uri: '${uri}'`, uri);
    }

    return cypherQueryResult.items[0];
  } catch (error) {
    console.error('Error getting service-offering by uri:', error);
    throw error;
  }
}
