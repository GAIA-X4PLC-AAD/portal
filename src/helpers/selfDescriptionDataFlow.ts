import { SelfDescriptionApiService } from '../services/selfDescriptionService';
import { SelfDescriptionDetails } from '../types/selfDescription.model';

/**
 * Returns a self-description by id
 * @param id the id of the self-description
 */
export const getOneSelfDescriptionWithDetails = async (id: string): Promise<SelfDescriptionDetails> => {
  const allSelfDescriptions = await SelfDescriptionApiService.getAllSelfDescriptions();
  const matchingSelfDescription = allSelfDescriptions.items.find((selfDescription) => selfDescription.meta.id === id);
  return matchingSelfDescription ? await SelfDescriptionApiService.getSelfDescriptionWithDetails(matchingSelfDescription?.meta.sdHash) : undefined;
};

/**
 * Returns all self-descriptions by ids
 * @param ids the ids of the self-descriptions
 */
export const getAllSelfDescriptionDetails = async (ids: string[]): Promise<SelfDescriptionDetails[]> => {
  const results = await Promise.all(ids.map((id) => getOneSelfDescriptionWithDetails(id)));
  return results.filter((result) => result !== undefined) as SelfDescriptionDetails[];
};
