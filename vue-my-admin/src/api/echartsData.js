import http from '../config/httpConfig'


export function fetchDashboard(url) {
    return http.get(`/echarts/admin/${url}`)
}