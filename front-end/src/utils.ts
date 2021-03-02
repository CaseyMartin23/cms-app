export const addAuthHeaders = () => {
  const auth_user = localStorage.getItem("auth_user");
  const token = auth_user ? JSON.parse(auth_user).token : "";

  if (token === "") throw new Error("User is not authenticated");

  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

type ObjectIndexingType = {
  [index: string]: any;
};

export const arrayOfObjectsAreEqual = (
  firstArray: ObjectIndexingType[],
  secondArray: ObjectIndexingType[]
) => {
  if (firstArray.length !== secondArray.length) return false;

  for (let i = 0; i < firstArray.length; i++) {
    if (
      typeof firstArray[i] === "object" &&
      !Array.isArray(firstArray[i]) &&
      typeof secondArray[i] === "object" &&
      !Array.isArray(secondArray[i])
    ) {
      const firstObject = firstArray[i];
      const secondObject = secondArray[i];
      const firstListProps = Object.getOwnPropertyNames(firstObject);
      const secondListProps = Object.getOwnPropertyNames(secondObject);

      if (firstListProps.length !== secondListProps.length) return false;

      for (let index = 0; index < firstListProps.length; index++) {
        const firstPropName = firstListProps[index];
        const secondPropName = secondListProps[index];

        if (firstPropName !== secondPropName) return false;

        const firstObjectProp = firstObject[firstPropName];
        const secondObjectProp = secondObject[secondPropName];

        if (
          typeof firstObjectProp === "object" &&
          Array.isArray(firstObjectProp) &&
          typeof secondObjectProp === "object" &&
          Array.isArray(secondObjectProp)
        ) {
          arrayOfObjectsAreEqual(firstObjectProp, secondObjectProp);
        }

        if (
          (typeof firstObjectProp === "number" &&
            typeof secondObjectProp === "number") ||
          (typeof firstObjectProp === "string" &&
            typeof secondObjectProp === "string")
        ) {
          if (firstObjectProp !== secondObjectProp) return false;
        }

        return true;
      }
    }
  }
};
