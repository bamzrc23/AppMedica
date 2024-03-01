const addSignatureToPDF = async (pdfUrl, signatureBase64, pageNumber, x, y, apiKey) => {
  const apiUrl = 'https://api.pdf.co/v1/pdf/edit/add';

  const data = {
    url: pdfUrl,
    name: 'result.pdf',
    annotations: [
      {
        text: signatureBase64,
        x: x,
        y: y,
        pageNumber: pageNumber,
        type: 'image',
        width: 100,
        height: 50,
        image: signatureBase64,
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    console.log("PDF con firma agregada:", jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('Error al agregar la firma al PDF:', error);
    throw error;
  }
};

export default addSignatureToPDF;
