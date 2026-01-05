import { useQuery } from '@tanstack/react-query';

export const USER_QUERY_KEY = {
  all: ['user'] as const,
  detail: (id: string) => ['user', id] as const,
};

export function useGetUser(userId: string) {
  return useQuery({
    queryKey: USER_QUERY_KEY.detail(userId),
    // queryFn: () => getUser(userId),
    enabled: !!userId,
  });
}
