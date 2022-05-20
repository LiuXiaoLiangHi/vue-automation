import { generate_number_0_1000_little7 } from '../../utils/generate-number.js'
 
/**
 * @class:这是一个随机生成部分数字的类
 * @description: 用于图表随机数字生成 
 */
export class RandomNumber{
     constructor(){
        this.expectedData=generate_number_0_1000_little7()
        this.actualData=generate_number_0_1000_little7()
     }
 }