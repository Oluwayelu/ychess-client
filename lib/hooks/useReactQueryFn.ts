import { AxiosError, AxiosResponse } from 'axios';
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { ResponseData } from '@/lib/types';
import useAxios from '../hooks/useAxios';

type QueryMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const useReactQuery = (
  key: string,
  path: string,
  method: QueryMethod = 'get'
) => {
  const instance = useAxios();

  return useQuery<AxiosResponse, AxiosError>({
    queryKey: [key],
    queryFn: () => instance.get(path),
  });
};

export const useReactMutation = (
  path: string,
  method: QueryMethod
): UseMutationResult<AxiosResponse, AxiosError<ResponseData>, unknown, () => void> => {
  const instance = useAxios();
  //? use this to get logged in status
  // const [isLoggedIn] = useContext<boolean>(false);

  return useMutation({
    mutationFn: (data: any) =>
      instance[`${method}`](path, data, {
        headers: {
          Authorization: '',
        },
      }),
  });
};

