/* eslint-disable prettier/prettier */
export class CreateMangerDto {
    name: string;
    money: number;
}
export class transferMoneyDto {
    fromId: number; // 转出账户id
    toId: number; // 转入账户id
    money: number; // 转账金额
}