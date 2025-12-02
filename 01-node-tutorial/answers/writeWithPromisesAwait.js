const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile(
      "temp.txt",
      "A message is written for this async function. \nAnother line of content. \nMore content is descripted ",
      { flag: "a" }
    );
  } catch (error) {
    console.log(error);
  }
};

const reader = async () => {
  try {
    const result = await readFile("temp.txt", "utf8");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
