import type { NetworkConnector } from '..';
import { EventTypes } from '../events/EventTypes';

export class Fetcher
{
    private hmsys: () => NetworkConnector;
    private counter = 0;
    private eventsHolder: { [ type in string ]: (message: any) => void } = {};
    constructor(hmsys: () => NetworkConnector)
    {
        this.hmsys = hmsys;
        this.hmsys().event({
            type: EventTypes.Message,
            action: ({ data }) =>
            {
                console.log(Object.keys(this.eventsHolder))
                Object.keys(this.eventsHolder).forEach(x => this.eventsHolder[ x ](data))
            }
        })
    }

    requestUserData(...data: ("profile" | "groupe" | "hmsys" | "services")[])
    {
        return this.customRequest({ action: "account", type: data })
    }

    customRequest(initialRequest: any)
    {
        return new Promise(x =>
        {
            const id = (this.counter++).toString();
            this.hmsys().ajson({
                id,
                ...initialRequest
            })

            this.eventsHolder[ id ] = (data) =>
            {
                if (data.id === id)
                {
                    x(data)
                    delete this.eventsHolder[ id.toString() ]
                }
            }
        })
    }
}