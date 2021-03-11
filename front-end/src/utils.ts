// User Authencation Collection
export const addAuthHeaders = () => {
  const auth_user = localStorage.getItem("auth_user");
  const token = auth_user ? JSON.parse(auth_user).token : "";

  if (token === "") throw new Error("User is not authenticated");

  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Object Equality:
type ObjectIndexingType = {
  [index: string]: any;
};

export const objectsAreEqual = (
  firstObj: ObjectIndexingType | undefined,
  secondObj: ObjectIndexingType | undefined
) => {
  if (!firstObj || !secondObj) return false;

  const firstListProps = Object.getOwnPropertyNames(firstObj);
  const secondListProps = Object.getOwnPropertyNames(secondObj);

  if (firstListProps.length !== secondListProps.length) return false;

  for (let index = 0; index < firstListProps.length; index++) {
    const firstPropName = firstListProps[index];
    const secondPropName = secondListProps[index];

    if (firstPropName !== secondPropName) return false;

    const firstObjectProp = firstObj[firstPropName];
    const secondObjectProp = secondObj[secondPropName];

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
};

// Array Of Objects Equality:
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

      return objectsAreEqual(firstObject, secondObject);
    }
  }
};
