import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ContractorButtonView from "../components/ContractorButtonView";
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";
import BriefInfoContainer from "../components/BriefInfoContainer";
import { API_PATH } from "../config/Api";
import { getApi } from "../utils/ApiCaller";

// const fetchedData = [
//   {
//       "_id": {
//           "$oid": "61ac2618238b0f5027bb1150"
//       },
//       "Ngày phê duyệt": "03/12/2021",
//       "Ngày đăng tải": "04/12/2021",
//       "Hình thức đấu thầu": "Trực tiếp",
//       "Lĩnh vực": "Xây lắp",
//       "Thông tin chi tiết": {
//           "Loại thông báo": "Thông báo thực",
//           "Số TBMT": "20211215550-00",
//           "Số hiệu KHLCNT": "20211190764",
//           "Tên gói thầu": "Cải tạo, sửa chữa thay lớp vữa chát tường cũ, sơn tường phòng nghỉ Đơn nguyên 3, 4 thuộc Trung tâm điều dưỡng và phục hôi chức năng Hải Yến",
//           "Tên dự án/ Dự toán mua sắm": "Cải tạo, sửa chữa thay lớp vữa chát tường cũ, sơn tường phòng nghỉ Đơn nguyên 3, 4 thuộc Trung tâm điều dưỡng và phục hồi chức năng Hải Yến",
//           "Bên mời thầu": "Trung tâm điều dưỡng và phục hồi chức năng Hải Yến",
//           "Hình thức lựa chọn NT": "Chỉ định thầu rút gọn",
//           "Giá dự toán": "87.417.000 VND",
//           "Giá gói thầu": "87.417.000  VND",
//           "Đính kèm thông báo kết quả LCNT": []
//       },
//       "Kết quả": {
//           "Nhà thầu trúng thầu": "Công ty TNHH thương mại dịch vụ Đạt Anh",
//           "Giá trúng thầu": "87.417.000",
//           "Hình thức hợp đồng": "Trọn gói",
//           "Thời gian thực hiện HĐ": "30 Ngày",
//           "Văn bản phê duyệt": "QĐ 48/HY ngày 03/12/2021",
//           "Ngày phê duyệt": "03/12/2021",
//           "Ngày đăng tải": "04/12/2021"
//       },
//       "Mô tả tóm tắt gói thầu": [],
//       "Các nhà thầu trúng thầu khác": []
//   },
//   {
//       "_id": {
//           "$oid": "61ac2618238b0f5027bb11f5"
//       },
//       "Ngày phê duyệt": "03/12/2021",
//       "Ngày đăng tải": "04/12/2021",
//       "Hình thức đấu thầu": "Trực tiếp",
//       "Lĩnh vực": "Hàng hóa",
//       "Thông tin chi tiết": {
//           "Loại thông báo": "Thông báo thực",
//           "Số TBMT": "20211215552-00",
//           "Số hiệu KHLCNT": "20211079939",
//           "Tên gói thầu": "Mua sắm tủ trưng bày mãu tiêu bản",
//           "Tên dự án/ Dự toán mua sắm": "Sưu tập tiêu bản sinh vật rừng năm 2021",
//           "Bên mời thầu": "VƯỜN QUỐC GIA YOK DON",
//           "Hình thức lựa chọn NT": "Chỉ định thầu rút gọn",
//           "Giá dự toán": "30.000.000 VND",
//           "Giá gói thầu": "30.000.000  VND",
//           "Đính kèm thông báo kết quả LCNT": []
//       },
//       "Kết quả": {
//           "Nhà thầu trúng thầu": "Trần Quang Lĩnh - Cơ sở chế biến và sản xuất đồ gỗ mỹ nghệ",
//           "Giá trúng thầu": "28.400.000",
//           "Hình thức hợp đồng": "Trọn gói",
//           "Thời gian thực hiện HĐ": "10 Ngày",
//           "Văn bản phê duyệt": "892/QĐ-VYD-KHTC ngày 03/12/2021",
//           "Ngày phê duyệt": "03/12/2021",
//           "Ngày đăng tải": "04/12/2021"
//       },
//       "Mô tả tóm tắt gói thầu": [],
//       "Các nhà thầu trúng thầu khác": []
//   },
//   {
//       "_id": {
//           "$oid": "61ac2619238b0f5027bb1218"
//       },
//       "Ngày phê duyệt": "03/12/2021",
//       "Ngày đăng tải": "04/12/2021",
//       "Hình thức đấu thầu": "Trực tiếp",
//       "Lĩnh vực": "Phi tư vấn",
//       "Thông tin chi tiết": {
//           "Loại thông báo": "Thông báo thực",
//           "Số TBMT": "20211215589-00",
//           "Số hiệu KHLCNT": "20211215587",
//           "Tên gói thầu": "Sửa chữa, ốp tấm nhựa Nano tại phòng Hội Đồng nhà trường của trường Tiểu học Khương Mai",
//           "Tên dự án/ Dự toán mua sắm": "Sửa chữa, ốp tấm nhựa Nano tại phòng Hội Đồng nhà trường của trường Tiểu học Khương Mai",
//           "Bên mời thầu": "Trường Tiểu học Khương Mai",
//           "Hình thức lựa chọn NT": "Chỉ định thầu rút gọn",
//           "Giá dự toán": "96.954.000 VND",
//           "Giá gói thầu": "96.954.000  VND",
//           "Đính kèm thông báo kết quả LCNT": []
//       },
//       "Kết quả": {
//           "Nhà thầu trúng thầu": "CÔNG TY TNHH DỊCH VỤ & THƯƠNG MẠI QUẢNG CÁO ĐẶNG LINH",
//           "Giá trúng thầu": "96.954.000",
//           "Hình thức hợp đồng": "Trọn gói",
//           "Thời gian thực hiện HĐ": "10 Ngày",
//           "Văn bản phê duyệt": "119/QĐ-THKM",
//           "Ngày phê duyệt": "03/12/2021",
//           "Ngày đăng tải": "04/12/2021"
//       },
//       "Mô tả tóm tắt gói thầu": [],
//       "Các nhà thầu trúng thầu khác": []
//   },
//   {
//       "_id": {
//           "$oid": "61ac261a238b0f5027bb1379"
//       },
//       "Ngày phê duyệt": "29/11/2021",
//       "Ngày đăng tải": "05/12/2021",
//       "Hình thức đấu thầu": "Trực tiếp",
//       "Lĩnh vực": "Hàng hóa",
//       "Thông tin chi tiết": {
//           "Loại thông báo": "Thông báo thực",
//           "Số TBMT": "20211215644-00",
//           "Số hiệu KHLCNT": "20211215630",
//           "Tên gói thầu": "Mua sắm vật tư hàng hóa phục vụ công tác nghiệp vụ ngành Tàu",
//           "Tên dự án/ Dự toán mua sắm": "Mua sắm vật tư hàng hóa phục vụ công tác nghiệp vụ ngành Tàu",
//           "Bên mời thầu": "Lữ đoàn 147",
//           "Hình thức lựa chọn NT": "Chỉ định thầu rút gọn",
//           "Giá dự toán": "95.074.830 VND",
//           "Giá gói thầu": "95.074.830  VND",
//           "Đính kèm thông báo kết quả LCNT": []
//       },
//       "Kết quả": {
//           "Nhà thầu trúng thầu": "Vũ văn Ty",
//           "Giá trúng thầu": "95.074.830",
//           "Hình thức hợp đồng": "Trọn gói",
//           "Thời gian thực hiện HĐ": "30 Ngày",
//           "Văn bản phê duyệt": "Số 2265/QĐ-LĐ ngày 29/11/2021",
//           "Ngày phê duyệt": "29/11/2021",
//           "Ngày đăng tải": "05/12/2021"
//       },
//       "Mô tả tóm tắt gói thầu": [
//           {
//               "STT": "1",
//               "Tên hàng hóa": "Bình sinh hàn nước",
//               "Số lượng": "02",
//               "Công suất": "Cái",
//               "Tính năng, thông số kỹ thuật cơ bản": "Vật liệu bằng đồng phù hợp với máy 3д12",
//               "Xuất xứ": "Liên doanh",
//               "Giá/Đơn giá trúng thầu": "18.500.000",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "2",
//               "Tên hàng hóa": "Sơn kem Ral 1015",
//               "Số lượng": "60",
//               "Công suất": "Lít",
//               "Tính năng, thông số kỹ thuật cơ bản": "Là loại sơn Hải Phòng có ký hiệu",
//               "Xuất xứ": "Việt Nam",
//               "Giá/Đơn giá trúng thầu": "83.050",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "3",
//               "Tên hàng hóa": "Sơn đỏ",
//               "Số lượng": "50",
//               "Công suất": "Lít",
//               "Tính năng, thông số kỹ thuật cơ bản": "Là loại sơn Hải Phòng có ký hiệu",
//               "Xuất xứ": "Việt Nam",
//               "Giá/Đơn giá trúng thầu": "71.000",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "4",
//               "Tên hàng hóa": "Xà phòng vì dân",
//               "Số lượng": "100",
//               "Công suất": "Kg",
//               "Tính năng, thông số kỹ thuật cơ bản": "Loại 1kg/gói",
//               "Xuất xứ": "Việt Nam",
//               "Giá/Đơn giá trúng thầu": "34.000",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "5",
//               "Tên hàng hóa": "Giẻ bảo quản",
//               "Số lượng": "150",
//               "Công suất": "Kg",
//               "Tính năng, thông số kỹ thuật cơ bản": "Kích thước 35x35cm mềm, dễ hút nước, lau khô nhanh sạch",
//               "Xuất xứ": "Việt Nam",
//               "Giá/Đơn giá trúng thầu": "16.000",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "6",
//               "Tên hàng hóa": "Máy mài bosch",
//               "Số lượng": "02",
//               "Công suất": "Cái",
//               "Tính năng, thông số kỹ thuật cơ bản": "Máy mài góc 2000W/180mm Bosch, làm bằng hợp kim nhôm siêu bền, có khả năng chống gỉ sét, chống biến dạng khi va đập",
//               "Xuất xứ": "Đức",
//               "Giá/Đơn giá trúng thầu": "3.233.415",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "7",
//               "Tên hàng hóa": "Bát đánh gỉ sắt",
//               "Số lượng": "05",
//               "Công suất": "Cái",
//               "Tính năng, thông số kỹ thuật cơ bản": "Đường kính 100mm",
//               "Xuất xứ": "Việt Nam",
//               "Giá/Đơn giá trúng thầu": "10.000",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "8",
//               "Tên hàng hóa": "Bát đánh gỉ vải",
//               "Số lượng": "05",
//               "Công suất": "Cái",
//               "Tính năng, thông số kỹ thuật cơ bản": "Đường kính 100mm",
//               "Xuất xứ": "Việt Nam",
//               "Giá/Đơn giá trúng thầu": "10.000",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "9",
//               "Tên hàng hóa": "Chổi sơn tay",
//               "Số lượng": "05",
//               "Công suất": "Cái",
//               "Tính năng, thông số kỹ thuật cơ bản": "Chổi có kích cỡ 2,5cm, màu vàng cán gỗ",
//               "Xuất xứ": "Việt Nam",
//               "Giá/Đơn giá trúng thầu": "10.000",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "10",
//               "Tên hàng hóa": "Chổi sơn lăn",
//               "Số lượng": "05",
//               "Công suất": "Cái",
//               "Tính năng, thông số kỹ thuật cơ bản": "Đầu dưới đường kính 40x100, thân bằng kim loại, cán nhựa",
//               "Xuất xứ": "Việt Nam",
//               "Giá/Đơn giá trúng thầu": "25.000",
//               "Ghi chú": ""
//           },
//           {
//               "STT": "11",
//               "Tên hàng hóa": "Bình sinh hàn dầu",
//               "Số lượng": "02",
//               "Công suất": "Cái",
//               "Tính năng, thông số kỹ thuật cơ bản": "Vật liệu bằng đồng phù hợp với máy 3д12",
//               "Xuất xứ": "Liên doanh",
//               "Giá/Đơn giá trúng thầu": "18.500.000",
//               "Ghi chú": ""
//           }
//       ],
//       "Các nhà thầu trúng thầu khác": []
//   },
//   {
//       "_id": {
//           "$oid": "61ac261c238b0f5027bb149e"
//       },
//       "Ngày phê duyệt": null,
//       "Ngày đăng tải": null,
//       "Hình thức đấu thầu": null,
//       "Lĩnh vực": "Tư vấn",
//       "Thông tin chi tiết": {},
//       "Kết quả": {},
//       "Mô tả tóm tắt gói thầu": [],
//       "Các nhà thầu trúng thầu khác": []
//   }
// ];

const ContractorHome = () => {

  const LOG_TAG = "[ContractorHome] ";

  const [data, setData] = React.useState(-1);
  const [fetchedData, setFetchedData] = React.useState([]);
  console.log(LOG_TAG + "init data = " + data);

  const getData = async (childData) => {
    console.log(LOG_TAG + "clicked button " + childData);
    let tempData = await getApi(API_PATH.CONTRACTOR_SELECTION_RESULTS, 0, 10);
    setData(childData); 
    setFetchedData(tempData["data"]);
  }

  const getBiddingId = (biddingId) => {
    console.log(LOG_TAG + " bidding id = " + biddingId);
    
  }

  const renderItem = ({ item }) => {
    try {
      console.log("Bidding name = " + item["Thông tin chi tiết"]["Tên gói thầu"]);
      return <BriefInfoContainer 
      biddingName={item["Thông tin chi tiết"]["Tên gói thầu"]} 
      bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
      publishDate={item["Ngày đăng tải"]}
      contractorWin={item["Kết quả"]["Nhà thầu trúng thầu"]}
      winCost={item["Kết quả"]["Giá trúng thầu"]}
      biddingId={item["_id"]["$oid"]}
      getBiddingId={getBiddingId} />
    } catch (error) {
      return <Text>Error when render item in flat list</Text>
    }
  }

  return (
    <View>
      <ContractorButtonView getData={getData}></ContractorButtonView>
      <Text>{SCREEN_MESSAGE.KET_QUA_TRUNG_THAU_MOI_NHAT_UPPER_CASE}</Text>
      <FlatList
      data={fetchedData}
      renderItem={renderItem}
      keyExtractor={item => item["_id"]["$oid"]}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ContractorHome;