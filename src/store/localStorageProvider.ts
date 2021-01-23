import { LoginData, ReloginData } from './AuthStore';
import { CustomProvider } from './CustomProvider';

export function createLocalStorageProvider(data: () => Promise<LoginData>): CustomProvider
{
    return {
        getReloginDetails: () =>
        {
            return localStorage[ "nc-ls-auth" ] ? JSON.parse(localStorage[ "nc-ls-auth" ]) : undefined
        },

        setReloginDetails: (data: ReloginData) => localStorage[ "nc-ls-auth" ] = JSON.stringify(data),
        resetReloginDetails: () => localStorage.removeItem("nc-ls-auth"),
        requestNewLoginDetials: () => data()
    }
}