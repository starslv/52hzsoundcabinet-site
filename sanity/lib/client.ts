import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// 只在服务端使用 token（Server Components / Route Handlers）
const token = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 用 token 时建议关 CDN，避免权限/缓存绕晕
  token,         // 没 token 也能跑（若 public read 开启），有 token 则必定能读到
});