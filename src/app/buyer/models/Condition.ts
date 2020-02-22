export class Condition{
    operand:string;
    operator:string;
    value:string;
    constructor(op,opr,val){
        this.operand =op;
        this.operator = opr;
        this.value = val;
    }
}