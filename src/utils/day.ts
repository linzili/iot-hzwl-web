export const HH_mm_ss_SSS = 'HH:mm:ss.SSS'

import dayUtil from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayUtil.extend(customParseFormat)

export default dayUtil
