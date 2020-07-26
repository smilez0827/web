export function attributeNameModify(obj, preAttribute, newAttribute) {
    obj[newAttribute] = obj[preAttribute];
    delete obj[preAttribute];
    return obj;
}


