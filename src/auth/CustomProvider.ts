import type { LoginData, ReloginData, ResponseTypeOfLoginRequest } from './AuthStore';

export type CustomProvider = {
    getReloginDetails: () => ReloginData | undefined
    resetReloginDetails: () => void
    setReloginDetails: (data: ReloginData) => void
    requestNewLoginDetials: (type: ResponseTypeOfLoginRequest) => Promise<LoginData>
}