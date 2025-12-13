
  const input = document.getElementById("inputFile");
  const form = document.getElementById("uploadForm");

  input.addEventListener("change", () => {
    if (input.files.length > 0) {
      form.submit();
    }
  });

