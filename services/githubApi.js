import { apiClient } from "./apiService";

export const fetchReposApi = ({ date, page }) =>
  apiClient.get(
    `/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`
  );