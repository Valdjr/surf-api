import { TimeUtil } from '../time'

describe('TimeUtil', () => {
    it('should return a unix time for a future day', () => {
        const unixTime = TimeUtil.getUnixTimeForAFutureDay(1)
        expect(typeof unixTime).toBe('number')
    })
})
