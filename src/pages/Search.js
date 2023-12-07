import React, { useEffect, useState } from "react";
import Subscribe from "../components/main/account/Subscribe";
import handleRequestParams from "../service/HandleRequestParams";
import "../css/search.css";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  selectCategories,
} from "../feature/category/categorySlice";
import { getSizes, selectSizes } from "../feature/size/sizeSlice";
import { getColors, selectColors } from "../feature/color/colorSlice";
import {
  searchProductList,
  selectSearchProductList,
  setSearchProductValues,
} from "../feature/search/searchSlice";
import ProductItem from "../components/main/product/ProductItem";
import { useLocation } from "react-router-dom";
// Đối tượng location chứa các thông tin như pathname (đường dẫn),
// search (chuỗi truy vấn), state (trạng thái của định tuyến), và hash (phần đánh dấu).

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchProductDatas = useSelector(selectSearchProductList);
  const categoriesStore = useSelector(selectCategories);
  const sizesStore = useSelector(selectSizes);
  const colorsStore = useSelector(selectColors);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isFilterDatas, setIsFilterDatas] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  //lay du lieu tren store redux tool kid khi lan dau vao component
  useEffect(() => {
    if (categoriesStore === null) {
      dispatch(getCategories());
    }
    if (sizesStore === null) {
      dispatch(getSizes());
    }
    if (colorsStore === null) {
      dispatch(getColors());
    }
    if (searchProductDatas === null) {
      dispatch(searchProductList(handleRequestParams(location?.search)));
    }
  }, [categoriesStore, sizesStore, colorsStore, searchProductDatas]);

  //cung lay tren store sreach tu lan thu 2 cho di
  const [items, setItems] = useState(null);
  useEffect(() => {
    if (
      categoriesStore !== null &&
      sizesStore !== null &&
      colorsStore !== null &&
      items === null
    ) {
      const itemList = [
        {
          label: "Category",
          items: getListProduct(categoriesStore, "Category"),
        },
        {
          label: "Size",
          items: getListProduct(sizesStore.data, "Size"),
        },
        {
          label: "Color",
          items: getListProduct(colorsStore.data, "Color"),
        },
      ];
      setItems(itemList);
    }
  }, [categoriesStore, sizesStore, colorsStore, items]);
  function getListProduct(arr, groupLabel) {
    let items = [];
    for (let i = 0; i < arr?.length; i++) {
      let nameItem = arr[i]?.name;
      let gender = arr[i]?.gender || null;
      let item = {
        id: arr[i].id,
        label: `${nameItem}`,
        checked: false,
        groupLabel: groupLabel,
        gender,
      };
      items.push(item);
    }
    return items;
  }
  //tao fill danh muc (category, size, color)

  const handleCheckboxChange = (labelChild, label, dataGender = null) => {
    const updatedItems = items.map((itemGroup) => {
      if (itemGroup.label === label) {
        return {
          ...itemGroup,
          items: itemGroup.items.map((item) => {
            if (item.label === labelChild && dataGender === item?.gender) {
              return {
                ...item,
                checked: !item.checked,
              };
            }
            return item;
          }),
        };
      }
      return itemGroup;
    });
    const hasAnyChecked = updatedItems.some((itemGroup) =>
      itemGroup.items.some((item) => item.checked)
    );
    setIsAnyChecked(hasAnyChecked);
    setIsFilterDatas(true);
    setItems(updatedItems);
  };

  const [datas, setDatas] = useState(null);
  const [tempDatas, setTempDatas] = useState(null);
  //set product de hien thi
  useEffect(() => {

    if (searchProductDatas != null && datas == null) {
      let productListLength = searchProductDatas?.data?.length;
      handleValidMore(productListLength, searchProductDatas?.data);
    }
  }, [searchProductDatas]);

  // filter search nang cao
  //check coi trong fill co checked chua
  useEffect(() => {
    if (isAnyChecked && isFilterDatas) {
      const checkedItems = items.flatMap((itemGroup) =>
        itemGroup.items.filter((item) => item.checked)
      );
      const filterCategoryEmtry = checkedItems.filter(
        (item) => item.groupLabel === "Category"
      );
      const filterSizeEmtry = checkedItems.filter(
        (item) => item.groupLabel === "Size"
      );
      const filterColorEmtry = checkedItems.filter(
        (item) => item.groupLabel === "Color"
      );

      let filteredProductsByCategory = searchProductDatas?.data.filter(
        (element) => {
          return filterCategoryEmtry.some(
            (filterItem) => element?.categoryResponse?.name === filterItem.label && element?.categoryResponse?.gender == filterItem?.gender
          );
        }
      );

      let filteredProductsBySize;
      if (filteredProductsByCategory?.length != 0) {
        filteredProductsBySize = filteredProductsByCategory.filter(
          (element) => {
            return element?.variantResponseList.some((variant) => {
              return filterSizeEmtry.some((filterSize) => {
                return variant?.sizeResponse?.name === filterSize?.label;
              });
            });
          }
        );
      } else {
        filteredProductsBySize = searchProductDatas?.data.filter((element) => {
          return element?.variantResponseList.some((variant) => {
            return filterSizeEmtry.some((filterSize) => {
              return variant?.sizeResponse?.name === filterSize?.label;
            });
          });
        }); 
      }

      let filteredProductsByColor;
      if (
        (filteredProductsBySize?.length != 0 &&
          filteredProductsByCategory != 0) ||
        filteredProductsBySize != 0
      ) {
        filteredProductsByColor = filteredProductsBySize.filter((element) => {
          return element?.variantResponseList.some((variant) => {
            return filterColorEmtry.some((filterColor) => {
              return variant?.colorResponse?.name === filterColor?.label;
            });
          });
        });
      } else if (filteredProductsByCategory != 0) {
        filteredProductsByColor = filteredProductsByCategory.filter(
          (element) => {
            return element?.variantResponseList.some((variant) => {
              return filterColorEmtry.some((filterColor) => {
                return variant?.colorResponse?.name === filterColor?.label;
              });
            });
          }
        );
      } else {
        filteredProductsByColor = searchProductDatas?.data.filter((element) => {
          return element?.variantResponseList.some((variant) => {
            return filterColorEmtry.some((filterColor) => {
              return variant?.colorResponse?.name === filterColor?.label;
            });
          });
        });
      }
      if (filterColorEmtry?.length != 0) {
        setTempDatas(filteredProductsByColor);
      } else if (filterSizeEmtry?.length != 0 && filterColorEmtry == 0) {
        setTempDatas(filteredProductsBySize);
      } else if (
        filterCategoryEmtry?.length != 0 &&
        filterSizeEmtry?.length == 0 &&
        filterColorEmtry == 0
      ) {
        setTempDatas(filteredProductsByCategory);
      }
      setIsFilterDatas(false);
    } else if (isAnyChecked == false && isFilterDatas) {
      setTempDatas(searchProductDatas?.data);
      setIsFilterDatas(false);
    }
  }, [items]);
  // khi co fill thi moi set product theo fill
  useEffect(() => {
    if (tempDatas != null) {
      let tempDatasLength = tempDatas?.length;
      if (tempDatasLength < 20) {
        setDatas(tempDatas);
        moreFunction();
      } else {
        let tempArr = [];
        for (let i = 0; i < 20; i++) {
          tempArr.push(tempDatas[i]);
        }
        setDatas(tempArr);
        moreFunction();
      }
    }
  }, [tempDatas]);
  // sort

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  useEffect(() => {
    moreFunction();
  }, [selectedValue]);
  const moreFunction = () => {
    if (selectedValue !== "") {
      if (selectedValue === "priceLowToHight") {
        setDatas(provState =>  [...provState].sort((a, b) => a.price - b.price));
      } else if (selectedValue === "priceHightToLow") {
        setDatas(provState =>  [...provState].sort((a, b) => b.price - a.price));
      }
    }

  }
  // show and hidden item menu
  const [itemVisibility, setItemVisibility] = useState({});

  const handleClickItem = (label) => {
    setItemVisibility((prevVisibility) => ({
      ...prevVisibility,
      [label]: !prevVisibility[label] || false,
    }));
  };

  //xem them
  const handleClickMore = () => {
    if (tempDatas == null) {
      let productListLength = searchProductDatas?.data?.length;
      handleValidMore(productListLength, searchProductDatas?.data);
    } else if (tempDatas != null) {
      let tempDatasLength = tempDatas?.length;
      handleValidMore(tempDatasLength, tempDatas);
    }
  };

  function handleValidMore(supLength, subList) {
    let datasLength = datas?.length == null ? 0 : datas?.length;
    if (datasLength == 0) {
      let elementArr = [];
      if (supLength > 20) {
        for (let i = 0; i < 20; i++) {
          elementArr.push(subList[i]);
        }
      } else {
        for (let i = 0; i < supLength; i++) {
          elementArr.push(subList[i]);
        }
      }
      setDatas(elementArr);
      return;
    }
    if (supLength <= datasLength) {
      return;
    } else if (supLength > datasLength) {
      let elementArr = [];
      if (supLength - datasLength > 20) {
        for (let i = datasLength; i < 20 + datasLength; i++) {
          elementArr.push(subList[i]);
        }
      } else {
        for (let i = datasLength; i < supLength; i++) {
          elementArr.push(subList[i]);
        }
      }
      setDatas((praveState) => [...praveState, ...elementArr]);
    }
  }

  // an hien xem them theo do dai cua searchProductDatas và tempDatas nếu có tồn tại
  const [showMore,setShowMore] = useState(false);
  useEffect(()=>{
    if(tempDatas != null){
      if(datas?.length < tempDatas?.length ){
        setShowMore(true);
      }else{
        setShowMore(false);
      }
    }else if(searchProductDatas != null && tempDatas== null){
      if(datas?.length < searchProductDatas?.data?.length ){
        setShowMore(true);
      }else{
        setShowMore(false);
      }
    }
  })
  // khi url thay doi thi chay
  useEffect(() => {
    if (searchProductDatas !== null) {
      dispatch(setSearchProductValues(null));
      setDatas(null);
      setTempDatas(null);
      setSelectedValue("");
      setItems(proveState =>  proveState?.map((itemGroup)=>{return {...itemGroup,items:itemGroup?.items?.map((element)=> {return {...element,checked:false}})}} ))
    }

    // Update the flag after the initial load
  }, [location?.search]);

  return (
    <main>
      <Subscribe />
      <div className="body-flex">
        <div className=" mt-5">
          <h3 className="title-start">TÌM KIẾM KẾT QUẢ CHO</h3>
          <h2 className="title-end">{handleRequestParams(location?.search)}</h2>
          <div className="straight-line"></div>

          <div className="d-flex justify-content-between mt-2 item-center mb-4">
            <div className="col-4 ">
              <div className="mb-2 text-bold">KẾT QUẢ</div>
              {tempDatas !== null ? (
                <div>{tempDatas?.length} Sản phẩm</div>
              ) : (
                <div>{searchProductDatas?.data?.length} Sản phẩm</div>
              )}
            </div>
            <div className="col-5"></div>
            <div className="col-3">
              <div className="mb-2 text-bold">SẮP XẾP THEO </div>
              <select
                class="form-select px-4 py-3 col-10"
                aria-label="Default select example"
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option disabled selected value="">
                  default
                </option>
                <option value="priceLowToHight">Giá từ thấp đến cao</option>
                <option value="priceHightToLow">Giá từ cao đến thấp</option>
                {/* <option value="3">Three</option> */}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="col-3 ">
              {items?.map((item, key) => {
                return (
                  <React.Fragment key={key}>
                    <div
                      className="d-flex justify-content-between items-center positer mb-2"
                      onClick={() => handleClickItem(item?.label)}
                    >
                      <h4 className="text-small">{item?.label}</h4>
                      {itemVisibility[item?.label] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </div>
                    {itemVisibility[item?.label] && (
                      <div className={`d-flex  flex-column pl-4 mb-3 `}>
                        {item?.items?.map((data, index) => (
                          <label className="" key={index}>
                            <input
                              type="checkbox"
                              className="ip-check"
                              checked={data.checked}
                              onChange={() =>
                                handleCheckboxChange(
                                  data.label,
                                  item.label,
                                  data?.gender
                                )
                              }
                            />
                            <span className="checkmark pl-3 text-size">
                              {`${data?.label} ${
                                data?.gender == null ? "" : data?.gender
                              }`}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="col-9 ">
              <section className="adoption-shop-area p-0">
                <div className="container">
                  <div className="row justify-content-center">
                    {datas?.map((data, key) => (
                      <ProductItem data={data} key={key} />
                    ))}
                  </div>
                </div>
              </section>
              <div className="dash"></div>
              {showMore ? (
                <div className="more">
                  <div
                    className="d-flex items-center positer"
                    onClick={() => handleClickMore()}
                  >
                    <div className="mr-4">Xem Thêm</div>
                    <span>
                      <FaChevronDown />
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Search;
