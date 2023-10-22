import QRCode from 'qrcode';

export const generateQrCode = async (data: string) => {
  try {
    const qr = await QRCode.toDataURL(data);

    // console.log(qr);
    return qr;
  } catch (e) {
    console.error(e);
  }
};
