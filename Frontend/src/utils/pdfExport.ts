import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const gerarPDF = async (
  element: HTMLElement,
  filename: string = "documento.pdf"
) => {
  if (!element) return;

  const cards = Array.from(element.children).filter(
    (el) => !el.querySelector("#buttonExport")
  );

  console.log(cards);

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const mmToPx = (mm: number) => (mm * window.devicePixelRatio * 96) / 25.4;

  const createWrapper = () => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "50%";
    wrapper.style.left = "50%";
    wrapper.style.transform = "translate(-50%, -50%)";
    wrapper.style.width = "700px";
    wrapper.style.padding = "2rem";
    wrapper.style.background = "white";
    wrapper.style.zIndex = "-1";

    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "2rem";

    wrapper.style.fontSize = "1.2rem";

    return wrapper;
  };

  const renderWrapperToPdfPage = async (wrapper: HTMLElement) => {
    document.body.appendChild(wrapper);

    const canvas = await html2canvas(wrapper, {
      scale: 1.5,
      useCORS: true,
      windowWidth: 1500,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.7);

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

    document.body.removeChild(wrapper);
  };

  let currentWrapper = createWrapper();
  let currentHeightPx = 0;

  for (let i = 0; i < cards.length; i++) {
    const cardClone = cards[i].cloneNode(true) as HTMLElement;

    cardClone.style.fontSize = "1.25rem";
    cardClone.style.width = "100%";
    cardClone.style.boxSizing = "border-box";

    currentWrapper.appendChild(cardClone);
    document.body.appendChild(currentWrapper);

    const heightNow = currentWrapper.getBoundingClientRect().height;

    document.body.removeChild(currentWrapper);

    const maxHeightPx = mmToPx(pageHeight) * 0.95;

    if (heightNow > maxHeightPx) {
      currentWrapper.removeChild(cardClone);
      await renderWrapperToPdfPage(currentWrapper);
      pdf.addPage();

      currentWrapper = createWrapper();
      currentWrapper.appendChild(cardClone);
      currentHeightPx = cardClone.getBoundingClientRect().height;
    } else {
      currentHeightPx = heightNow;
    }
  }

  if (currentWrapper.children.length > 0) {
    await renderWrapperToPdfPage(currentWrapper);
  }

  pdf.save(filename);
};
