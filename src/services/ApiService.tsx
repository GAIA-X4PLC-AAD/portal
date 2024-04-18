import axios, { AxiosResponse } from "axios";
import { AuthContextValues } from "../context/AuthContextValues";
import { isEmpty } from "../utils/helpers";

export const ApiService = {
  /**
   *
   * @param authContext
   * @param targetClass String of the type of data you want to search for (@type specification in Self Description)
   * @param searchProperty String of the domain you want to search in/the property you want to search for
   * @param searchTerm String of the keyword you want to search for
   */
  async getSelfDescriptionsForShape(
    authContext: AuthContextValues,
    targetClass: string,
    searchProperty?: string,
    searchTerm?: string
  ): Promise<AxiosResponse<any, any>> {
    let searchQuery = "";
    if (isEmpty(searchProperty) && isEmpty(searchTerm)) {
      searchQuery = "MATCH (n:" + targetClass + ") RETURN properties(n)";
    } else {
      searchQuery =
        "MATCH (n:" +
        targetClass +
        ") WHERE toLower(n." +
        searchProperty +
        ") CONTAINS toLower('" +
        searchTerm +
        "') RETURN properties(n)";
    }

    const requestBody = { statement: searchQuery };
    const endpoint = "https://fc-server.gxfs.gx4fm.org/query";
    const headers = {
      Authorization: `Bearer ${authContext.token}`,
      "Access-Control-Allow-Origin": "*",
    };

    return axios
      .options(endpoint, { headers })
      .then(() => {
        return axios.post(endpoint, requestBody, { headers });
      })
      .then((response) => {
        console.log("Post Response", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  // Returns every Service Offering available
  async getAllSelfDescriptions(
    authContext: AuthContextValues
  ): Promise<AxiosResponse<any, any>> {
    const endpoint = "https://fc-server.gxfs.gx4fm.org/query";
    const headers = {
      Authorization: `Bearer ${authContext.token}`,
      "Access-Control-Allow-Origin": "*",
    };
    const requestBody = {
      statement: `MATCH (n:ServiceOffering) RETURN properties(n), labels(n) LIMIT 100`,
    };

    // Perform POST request
    return await axios
      .options(endpoint, { headers })
      .then(() => {
        return axios.post(endpoint, requestBody, { headers });
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  async getOneSelfDescriptions(
    authContext: AuthContextValues,
    claimsGraphUri: string | undefined
  ): Promise<any> {
    if (!claimsGraphUri) {
      // Handle the case where claimsGraphUri is not provided
      console.error("No claimsGraphUri provided");
      throw new Error("No claimsGraphUri provided"); // Or return a custom error object
    }

    const endpoint = "https://fc-server.gxfs.gx4fm.org/query";
    const headers = {
      Authorization: `Bearer ${authContext.token}`,
      "Access-Control-Allow-Origin": "*",
    };
    const requestBody = {
      statement: `MATCH (n:HDMap) WHERE '${claimsGraphUri.replace(
        /'/g,
        "\\'"
      )}' IN n.claimsGraphUri RETURN properties(n), labels(n) LIMIT 1`,
    };

    try {
      await axios.options(endpoint, { headers });
      const response = await axios.post(endpoint, requestBody, { headers });
      console.log("This is ONE Service Offering: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching self descriptions:", error);
      // Handle the error appropriately
      throw error; // Re-throw the error if you want to handle it in the calling function
    }
  },

  // Returns every Resource available
  async getAllResources(
    authContext: AuthContextValues
  ): Promise<AxiosResponse<any, any>> {
    const endpoint = "https://fc-server.gxfs.gx4fm.org/query";
    const headers = {
      Authorization: `Bearer ${authContext.token}`,
      "Access-Control-Allow-Origin": "*",
    };
    const requestBody = {
      statement: `MATCH (n:HDMap) RETURN properties(n), labels(n)`,
    };

    // Perform POST request
    return await axios
      .options(endpoint, { headers })
      .then(() => {
        return axios.post(endpoint, requestBody, { headers });
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  async getShaclShapesFromCatalogue(
    authContext: AuthContextValues
  ): Promise<AxiosResponse<any, any>> {
    const endpoint =
      "https://fc-server.gxfs.gx4fm.org/schemas/latest?type=shape";
    const headers = {
      Authorization: `Bearer ${authContext.token}`,
      "Access-Control-Allow-Origin": "*",
    };

    return axios
      .options(endpoint, { headers })
      .then(() => {
        return axios.get(endpoint, { headers });
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
