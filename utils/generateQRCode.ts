import QRCode from 'qrcode';

export const generateQrCode = async (data: string) => {
  try {
    const qr = await QRCode.toDataURL(data, { width: 280 });

    return qr;
  } catch (e) {
    console.error(e);
  }
};
