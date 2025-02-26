import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../App/providers/config";

export interface AccountInfo {
  id: number;
  username: string;
  role: string;
}

interface WrappedAccountInfo {
  data: AccountInfo;
}

async function fetchAccountInfo(): Promise<AccountInfo> {
  const res = await instance.get<WrappedAccountInfo>("/me");
  return res.data.data;
}

export function useAccountInfo() {
  return useQuery<AccountInfo, Error>({
    queryKey: ["accountInfo"],
    queryFn: fetchAccountInfo,
    retry: false,
  });
}
