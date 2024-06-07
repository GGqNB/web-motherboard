import axios from 'axios';
import { Phone } from 'src/declarations/responses/phone';
import { PHONE } from 'src/backend/endpoints/phone'

export type PhoneList =  { items:  Array<Phone.PhoneBrief> , total: number, page: number};


export default class PhoneApi {

  public static async phoneList(params? : any): Promise<PhoneList> {
    const responseData: PhoneList = await axios({
      ...PHONE.LIST,
      params,
    })
      .then((r): PhoneList => r.data);

    return responseData;
  }


  public static async phoneCreate(data: Phone.PhoneBare): Promise<Phone.PhoneBrief> {
    const responseData: Phone.PhoneBrief = await axios({
      ...PHONE.CREATE,
      data,
    })
      .then((r): Phone.PhoneBrief => r.data);

    return responseData;
  }

  public static async phoneDelete(id: number): Promise<{ mes: string}> {
    const responseData: { mes: string} = await axios({
      ...PHONE.DELETE(id),
    })
      .then((r): { mes: string} => r.data);

    return responseData;
  }
  //хз может потом пригодится
  // public static async phoneUpdate(data: Phone.PhoneBare, id: number): Promise<Phone.PhoneBrief> {
  //   const responseData: Phone.PhoneBrief = await axios({
  //     ...PHONE.UPDATE(id),
  //     data,
  //   })
  //     .then((r): Phone.PhoneBrief => r.data);

  //   return responseData;
  // }
  
}
