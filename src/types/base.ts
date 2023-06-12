/**
 * @enum 性别
 */
export enum Sex{
    /**
     * @EnumMember 男 - 0
     */
    man = 0,
    /**
     * @EnumMember 女 - 1
     */
    woman = 1
}

/**
 * @interface Resume 简历信息、
 * @property  {string} name 姓名
 * @property {Sex} sex 性别
 * @property {number} age 年龄
 * @property {string} phone 手机号
 * @property {string} Email 邮箱
 * @property {string} location 地址
 * @property {string} file 附件
 * @property {string} doc 简历文档
 */
export interface Resume {
    name: string;
    sex: Sex;
    age: number;
    phone: string;
    Email: string;
    location: string;
    file: string;
    doc: string;
    sender?: string;
}
