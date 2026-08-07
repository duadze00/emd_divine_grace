function Loop() {
  const list = ["Eric", "Mawule", "Duadze", "Kwadwo"];

  return (
    <>
      {list.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item}</h1>
          </div>
        );
      })}
    </>
  );
}

export default Loop;
