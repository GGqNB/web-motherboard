import axios from 'axios';
import { Nfc } from 'src/declarations/responses/nfc';
import { NFC } from 'src/backend/endpoints/nfc'

export type NfcList =  { items:  Array<Nfc.NfcBrief> , total: number, page: number};




export default class NfcApi {

  public static async nfcList(params? : any): Promise<NfcList> {
    const responseData: NfcList = await axios({
      ...NFC.LIST,
      params,
    })
      .then((r): NfcList => r.data);

    return responseData;
  }


  public static async nfcCreate(data: Nfc.NfcBare): Promise<Nfc.NfcBrief> {
    const responseData: Nfc.NfcBrief = await axios({
      ...NFC.CREATE,
      data,
    })
      .then((r): Nfc.NfcBrief => r.data);

    return responseData;
  }

  public static async nfcUpload(data): Promise<{success : boolean}> {
    const responseData: {success : boolean} = await axios({
      ...NFC.UPLOAD,
      data,
    })
      .then((r): { success : boolean } => r.data);

    return responseData;
  }

  public static async nfcDelete(id: number): Promise<{ mes: string}> {
    const responseData: { mes: string} = await axios({
      ...NFC.DELETE(id),
    })
      .then((r): { mes: string} => r.data);

    return responseData;
  }

  public static async nfcShow(id: number): Promise<Nfc.NfcBrief> {
    const responseData: Nfc.NfcBrief = await axios({
      ...NFC.SHOW(id),
    })
      .then((r): Nfc.NfcBrief => r.data);

    return responseData;
  }

  public static async nfcUpdate(data: Nfc.NfcBare, id: number): Promise<Nfc.NfcBrief> {
    const responseData: Nfc.NfcBrief = await axios({
      ...NFC.UPDATE(id),
      data,
    })
      .then((r): Nfc.NfcBrief => r.data);

    return responseData;
  }
  
}
