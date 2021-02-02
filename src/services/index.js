const makeFetch = async (requestData) => {
  try {
    const res = await fetch(requestData);
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

export default makeFetch;
