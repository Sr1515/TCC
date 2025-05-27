import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const gerarPDF = async (
    element: HTMLElement,
    filename: string = "documento.pdf"
) => {
    if (!element) return;

    const clone = element.cloneNode(true) as HTMLElement;

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "0";
    wrapper.style.left = "0";
    wrapper.style.width = "1500px";
    wrapper.style.zIndex = "-1";
    wrapper.style.overflow = "visible";
    wrapper.style.background = "white";
    wrapper.style.padding = "2rem";

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    try {
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            windowWidth: 1500
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        while (heightLeft > 0) {
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;

            if (heightLeft > 0) {
                pdf.addPage();
            }
        }

        pdf.save(filename);
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
    } finally {
        document.body.removeChild(wrapper);
    }
};
