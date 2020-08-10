import request from "@/utils/request";

export function getRouterList(data) {
  return request({
    url: "/api/v2/menu/getAll",
    method: "get",
    data,
  });
}
