import Mock from 'mockjs'
//生成一个0~1000的数字
export const generate_number_0_1000 = () => Mock.mock('@integer(0, 1000)')

export const generate_number_0_1000_little7 =
    () => [
        generate_number_0_1000(),
        generate_number_0_1000(),
        generate_number_0_1000(),
        generate_number_0_1000(),
        generate_number_0_1000(),
        generate_number_0_1000(),
        generate_number_0_1000(),
    ]