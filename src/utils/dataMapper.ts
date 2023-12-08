interface ResponseData {
  totalCount: number;
  items: {
    "properties(n)": {
      "claimsGraphUri": string[],
      "survey_creation_time": string,
      "contract_id": string,
      "survey_end_time": string,
      "uri": string,
      "edc_endpoint": string
    };
  }[];
}

export function mapSelfDescriptions(selfDescriptions: any) {
  return selfDescriptions.items.map((selfDescription: any) => {
    return {
      // survey_id: selfDescription.properties["properties(n)"].survey_id,
      // survey_title: selfDescription["properties(n)"].survey_title,
      // survey_description: selfDescription["properties(n)"].survey_description,
      claimsGraphUri: selfDescription["properties(n)"].claimsGraphUri,
      // survey_close_time: selfDescription["properties(n)"].survey_close_time,
      survey_creation_time: selfDescription["properties(n)"].survey_creation_time,
      survey_end_time: selfDescription["properties(n)"].survey_end_time,
      // survey_start_time: selfDescription["properties(n)"].survey_start_time,
      // survey_state: selfDescription["properties(n)"].survey_state,
      // survey_url: selfDescription["properties(n)"].survey_url,
      id: selfDescription["properties(n)"].uri,
      edcEndpoint: selfDescription["properties(n)"].edc_endpoint,
      contractId: selfDescription["properties(n)"].contract_id
    };
  });
}
