import axios from 'axios';
import { useContext } from 'react';

import { AuthContext } from '../../context/AuthContextProvider';
import { useFilters } from '../../context/ResourceFilterContext';

import { useFilterAssets } from './useFilterAssets';

export const useResourceFilter = () => {
  const { filters } = useFilters();
  const { token } = useContext(AuthContext);
  const { typeAssets, formatAssets, vendorAssets } = useFilterAssets();
  const fetchFilteredData = async () => {
    const endpoint = 'https://fc-server.gxfs.gx4fm.org/query';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    };

    // Constructing parts of the query based on filter toggles
    const typeConditions = typeAssets
      .filter((asset) => filters[asset.checkboxName as keyof typeof filters])
      .map((asset) => `(n:${asset.label.replace(/\s+/g, '')})`);

    const formatConditions = formatAssets
      .filter((asset) => filters[asset.checkboxName as keyof typeof filters])
      .map((asset) => `n.General_format_data_format = '${asset.label}'`);

    const vendorConditions = vendorAssets
      .filter((asset) => filters[asset.checkboxName as keyof typeof filters])
      .map((asset) => `n.vendor = '${asset.label}'`);

    // Check if any filters are active
    const isAnyFilterActive = Object.values(filters).some((value) => value);

    let query = '';
    if (isAnyFilterActive) {
      const conditions = [
        ...typeConditions,
        ...formatConditions,
        ...vendorConditions,
      ].join(' OR ');
      const whereClause = conditions.length > 0 ? ` WHERE ${conditions}` : '';
      query = `MATCH (n)${whereClause} RETURN properties(n), labels(n)`;
    } else {
      query =
        'MATCH (n) WHERE (n:HDMap OR n:EnvironmentModel OR n:Scenario) RETURN properties(n), labels(n)';
    }

    const requestBody = { statement: query };

    console.log('My request body: ', requestBody);

    try {
      const response = await axios.post(endpoint, requestBody, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  };

  return { typeAssets, formatAssets, vendorAssets, fetchFilteredData };
};
