import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useCreate = (keyItem, url, onSuccess = null) => {
    const queryClient = useQueryClient()
    const addData = async ({ url, ...data }) => {
        return await axios.post(url, data);
    };
    const { mutateAsync, isLoading, error, isError } = useMutation(addData, { onSuccess: onSuccess })
    const create = async (data) => {
        await mutateAsync({ url, ...data })
        queryClient.invalidateQueries(keyItem)
    }
    return { isLoading, create, error, isError }
}

export const useRetrieve = (keyItem, url, onSuccess = null) => {
    const useGetData = async ({ queryKey }) => {
        /* eslint-disable no-unused-vars */
        const [_key, { url }] = queryKey;
        const { data } = await axios.get(url);
        return data;
    };
    // return data
    return useQuery([keyItem, { url }], useGetData, { onSuccess: onSuccess });
};

export const useUpdate = (keyItem, url, onSuccess = null) => {
    const queryClient = useQueryClient()
    const updateData = async ({ uri, ...data }) => {
        return await axios.put(uri, data);
    };
    const { mutateAsync, isLoading, error, isError } = useMutation(updateData, { onSuccess: onSuccess })
    const update = async (data) => {
        const uri = `${url}/${data.id}`
        await mutateAsync({ uri, ...data })
        queryClient.invalidateQueries(keyItem)
    }
    return { isLoading, update, error, isError }
}

export const useDelete = (keyItem, url, onSuccess = null, onMutate = null) => {
    const queryClient = useQueryClient()
    const deleteData = async (url) => {
        const { data } = await axios.delete(url);
        return data;
    };
    const { mutateAsync, isLoading, error, isError } = useMutation(deleteData, { onSuccess: onSuccess, onMutate: onMutate })
    const remove = async (id) => {
        const uri = `${url}/${id}`
        await mutateAsync(uri)
        queryClient.invalidateQueries(keyItem)
    }
    return { isLoading, remove, error, isError }
}