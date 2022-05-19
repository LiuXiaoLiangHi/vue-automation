import { generate_number_0_1000 } from '../../utils/generate-number.js'
import { RandomNumber } from './random-number.js'

export const newVisitis = (req, res) => {
    // 通过这个类生成一些数据
    let mockDate = new RandomNumber()
    // sum
    let sumMockDate = 0
    mockDate.actualData.forEach((el, index) => {
        sumMockDate += el
    })
    res.send({
        code: 20000,
        msg: '',
        data: {
            grossData: {
                newVisitis: sumMockDate,
                messages: generate_number_0_1000(),
                purchases: generate_number_0_1000(),
                shoppings: generate_number_0_1000()
            },
            lineChartData: mockDate
        }
    })
}