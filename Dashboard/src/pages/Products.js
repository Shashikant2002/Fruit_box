import * as React from 'react';
import { useState,useEffect,useRef,useCallback } from 'react';
import axios from 'axios';
import { Toolbar, Tooltip,Menu, MenuItem,TextField,InputLabel,Select,FormControl, IconButton, Typography,Button,ListItemIcon, ListItemText, OutlinedInput, InputAdornment } from '@mui/material';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Link ,useNavigate} from 'react-router-dom';
import Iconify from '../components/Iconify';
import Avatar from '@mui/material/Avatar';
import SideDrawer from '../global/Drawer';
import LoadingSpinner from '../components/Spinner';
import AddProducts from './SidebarPages/productpage/AddProducts';
import EditProduct from './SidebarPages/productpage/EditProduct';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import noImage from '../assests/No_image.svg'
import searchNotFound from "../assests/searchnotfound.gif"
import palette from '../theme/palette';
import { convertDate ,deleteImageFromFirebase,getGapBetweenDates} from '../global/globalFunctions';
import ConfimModal from "../global/Modals/ConfimModal"
import CustomizedSnackbars from '../global/Snackbar/CustomSnackbar';
import { config } from 'src/global/globalConfig';
import { UseContextState } from 'src/global/GlobalContext/GlobalContext';
import { editable_config } from 'src/editable_config';
import VideoModal from 'src/global/Modals/VideoModal';



function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData('Cupcake', 305, 3.7, "pending", 4.3,),
  createData('Donut', 452, 25.0, "verified", 4.9,),
  createData('Eclair', 262, 16.0, "pending", 6.0,),
  createData('Frozen yoghurt', 159, 6.0, "verified", 4.0,),
  createData('Gingerbread', 356, 16.0, "not verified", 3.9,),
  createData('Honeycomb', 408, 3.2, "not verified", 6.5,),
  createData('Ice cream sandwich', 237, 9.0, "not verified", 4.3,),
  createData('Jelly Bean', 375, 0.0, "pending", 0.0,),
  createData('KitKat', 518, 26.0, "verified", 7.0,),
  createData('Lollipop', 392, 0.2, "not verified", 0.0,),
  createData('Marshmallow', 318, 0, "verified", 2.0,),
  createData('Nougat', 360, 19.0, "not verified", 37.0,),
  createData('Oreo', 437, 18.0, "not verified", 4.0,),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
 
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: ``,
  },
  {
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'Product Name',
  },
  {
    id: 'product code',
    numeric: false,
    disablePadding: true,
    label: 'Product Code',
  },
 
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Category',
  },
  {
    id: 'quantity',
    numeric: false,
    disablePadding: false,
    label: 'QTY',
  },

  
  // {
  //   id: 'regular_price',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Regular Price',
  // },
  // {
  //   id: 'sale_price',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Sale Price',
  // },
  
  // {
  //   id: 'product_gst',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Gst',
  // },

  // {
  //   id: 'quantity',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Quantity',
  // },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  
  // {
  //   id: 'shop_name',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Shop Name ',
  // },
  // {
  //   id: 'shop_id',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Shop Id ',
  // },
  // {
  //   id: 'status',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Status',
  // },
  {
    id: 'view',
    numeric: false,
    disablePadding: false,
    label: 'View',
  },


];

function EnhancedTableHead(props) {
  const { onSelectAllClick,order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow   >
      <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'none'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{textTransform:"uppercase"}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >


{numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : 
        (<Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {`All Products (${props.productCount})`} 
        </Typography>
      )
        } 
 
        <Tooltip title="Filter list">
            <>
        
          {numSelected > 0 && (
        // <Tooltip title="">
          <IconButton>        
            <MoreVertOutlinedIcon style={{cursor:"pointer"}} ref={ref} onClick={() => setIsOpen(true)} fontSize='medium' />
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 290, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
         <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{props.setAsNewArrival(props.selected);setIsOpen(false)}} >
          <ListItemIcon>
            <Iconify icon="ic:sharp-star" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Set as New Arrival"  primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
         <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{props.removeAsNewArrival(props.selected);setIsOpen(false)}} >
          <ListItemIcon>
            <Iconify icon="ic:sharp-star-border" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Remove From New Arrival"  primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{props.setAsTrendingProducts(props.selected);setIsOpen(false)}} >
          <ListItemIcon>
            <Iconify icon="ant-design:fire-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Set As Trending Product"  primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{props.removeAsTrendingProducts(props.selected);setIsOpen(false)}} >
          <ListItemIcon>
            <Iconify icon="ant-design:fire-outlined" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Remove From Trending Product"  primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{props.setOpenDeleteConfimModal(true);setIsOpen(false)}} >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete Product "  primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

       
      </Menu>

          </IconButton>
        // </Tooltip>
      ) }
    </>

        </Tooltip>
      
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filterName, setFilterName] = useState('');
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [ loading , setLoading ] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [drawerBulkUpload, setDrawerBulkUpload] = React.useState(false);
  const [drawerAddProduct, setDrawerAddProduct] = React.useState(false);
  const [drawerEditCategory, setDrawerEditCategory] = React.useState(false);
  const [drawerProductTag, setDrawerProductTag] = React.useState(false);
  const [openProductLimitModal, setOpenProductLimitModal] = useState(false);
  const [productIdForEdit , setproductIdForEdit ] = useState('')
  const [render , setRender ] = useState(false)
  const [filters , setFilters ] = useState({by_status:'all',by_category:'all',by_type:'all',by_product_status:'all',recentDays:'All'})
  const [age, setAge] = React.useState('');
  const [data , setData ] = useState([]);
  const [productCount , setProductCount ] = useState(0)
  const [searchValue , setSearchValue ] = useState('')
  const [ catgoryFilter , setCatgoryFilter ] = useState([]);
  const [ productStatusFilter, setProductStatusFilter ] = useState([]);
  const [ openDeleteConfimModal, setOpenDeleteConfimModal ] = useState(false)
  const [message ,setMessage] = useState({type:"",message:""})
  const [snackbarOpen,setSnackbarOpen ] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const {authState} = UseContextState();
  const [stateDate, setStateDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      startDate: '',
      endDate: '',
      key: 'selection'
    }
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("selected",selected)

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("authState=>>",authState)
  console.log("PRODUCTS=>>",data)
  // console.log("PAGES=>>",currentPage)
  // console.log("TOTAL_PAGES=>>",totalPages)
//========================= GET ALL PRODUCTS =========================
  useEffect(()=>{
    setLoading(true)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/all/products?page=${currentPage}&search=${searchValue}&by_category=${filters?.by_category}&by_type=${filters?.by_type}&by_product_status=${filters?.by_product_status}&date_from=${stateDate[0]?.startDate}&date_to=${stateDate[0]?.endDate}`,{headers: {
      'Authorization': `token ${editable_config.FRONTEND_VALIDATOR}`,
    },withCredentials:true})
    .then(res=>{
      console.log(res)
      setData([...res?.data?.allProducts]);
      setProductCount(res?.data?.getProductsCount || 0);
      setTotalPages(res?.data?.pages )
      setCatgoryFilter(res?.data?.categoryForFilter);
      setProductStatusFilter(res?.data?.getAllProductStatus);
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
    })
  },[render,currentPage,filters?.by_category,filters?.by_type,filters.by_product_status,stateDate,filters?.recentDays])
//========================= GET ALL PRODUCTS =========================

//======================== FILTER FOR PRODUCTS ========================
// useEffect(()=>{
//   if(filters.by_category === 'all' && filters.recentDays ==='All' && filters.by_product_status === 'all'){
//     setRender(prev=>!prev)
//     return
//   }
//   setLoading(true)
//   axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/filter/products?by_category=${filters?.by_category}&by_product_status=${filters?.by_product_status}&date_from=${stateDate[0]?.startDate}&date_to=${stateDate[0]?.endDate}`,)
//   .then(res=>{
//     console.log(res)
//     setData(res?.data)
//     setProductCount(res?.data?.length)
//     setLoading(false)
//   })
//   .catch(err=>{
//     console.log(err)
//     setLoading(false)
//   })
// },[filters?.by_category,filters.by_product_status,stateDate,filters?.recentDays])
//======================== FILTER FOR PRODUCTS ========================

  //========================= HANLDE SEARCH =========================
  const handleSearch = async(e)=>{
    e.preventDefault();
    setFilters((prev)=>({...prev,by_category:'all'}))
    setStateDate([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        startDate: '',
        endDate: '',
        key: 'selection'
      }
    ])
    setCurrentPage(1)
    setRender(prev=>!prev)
    // setLoading(true)
    // await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/search/in/products?search=${searchValue}&page=${page+1}`,
    // .then(res=>{
    //   console.log(res)
    //   setData(res?.data?.result)
    //   setProductCount(res?.data?.count)
    //   setLoading(false)
    // })
    // .catch(err=>{
    //   console.log(err)
    //   setLoading(false)
    // })
  }

  //========================= HANLDE SEARCH =========================


  //====================== HANDLE CATEGORY FILTER CHANGE ===========================
  const handleCatgoryFilterChange=(e)=>{
    if(e.target.value === 'all'){
      setFilters((prev)=>({...prev,by_category:e.target.value,by_type:'all'}))
      setStateDate([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          startDate: '',
          endDate: '',
          key: 'selection'
        }
      ])
    setCurrentPage(1)
      setRender(prev=>!prev)
      return;
    }
    setFilters((prev)=>({...prev,by_category:e.target.value,by_type:'all'}))
    setStateDate([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        startDate: '',
        endDate: '',
        key: 'selection'
      }
    ])
    setCurrentPage(1)


  }
  //====================== HANDLE CATEGORY FILTER CHANGE ===========================

  //====================== HANDLE PRODUCT TYPE FILTER CHANGE ===========================
  const handleProductTypeFilterChange=(e)=>{
    console.log(e.target);
    if(e.target.value === 'all'){
      setFilters((prev)=>({...prev,by_type:e.target.value,by_category:'all'}))
      setStateDate([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          startDate: '',
          endDate: '',
          key: 'selection'
        }
      ])
    setCurrentPage(1)
      setRender(prev=>!prev)
      return;
    }
    setFilters((prev)=>({...prev,by_type:e.target.value,by_category:'all'}))
    setStateDate([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        startDate: '',
        endDate: '',
        key: 'selection'
      }
    ])
    setCurrentPage(1)


  }
  //====================== HANDLE PRODUCT TYPE  FILTER CHANGE ===========================

  //====================== HANDLE PRODUCT FILTER CHANGE ===========================
  const handleProductFilterChange=(e)=>{
    if(e.target.value === 'all'){
      setFilters((prev)=>({...prev,by_product_status:e.target.value}))
      setRender(prev=>!prev)
      return;
    }
    setFilters((prev)=>({...prev,by_product_status:e.target.value}))

  }
  //====================== HANDLE PRODUCT FILTER CHANGE ===========================

  // ========================= HANDLE RESET FILTER ======================
  const handleResetFilter=()=>{
    setIsOpen2(false);
    setFilters({by_category:'all',by_product_status:'all',recentDays:'All'})
  }
  // ========================= HANDLE RESET FILTER ======================

  // ============ TABLE PAGINATION ============
const handleOnClickPagePrevious = () => {
  if(currentPage > 1){
    setCurrentPage(prev=>prev - 1);
  }
  return
};
const handleOnClickPageNext = () => {
  if(currentPage < totalPages){
    setCurrentPage(prev=>prev + 1);
  }
  return
};
// ============ TABLE PAGINATION ============

  //========================= HANDLE RECENT USER FUNCTION =========================
  const handleRecentUsers = (value)=>{
    setSearchValue("")
    setFilters((prev)=>({...prev,by_category:'all'}))
    setCurrentPage(1)

    // console.log("+++++value=========",value)
     let date = new Date().toJSON().slice(0, 10);
    // console.log(date); // "2022-06-17"
    const currentDate = new Date().toDateString()
    // console.log("current Date",currentDate.length)
    const getCompareValue = `${value?.startDate}`
    // console.log("getCompareValue",getCompareValue?.slice(0,15)?.length)

    // FOR SETTING TODAY IN DATE FILTER
    if(getCompareValue?.slice(0,15) == `${currentDate}` ){
      // console.log("ENTERED")
      setFilters((prev)=>({...prev,recentDays:"Today"}))
      return;
    }
    const startDateGap = getGapBetweenDates(value?.endDate,value?.startDate)
    console.log("getGapBetweenDates",startDateGap)
    // FOR SETTING YESTERDAY IN DATE FILTER
    if(startDateGap == 1){
      setFilters((prev)=>({...prev,recentDays:"Yesterday"}))
      return;
    }
    // FOR SETTING YESTERDAY IN DATE FILTER
    if(startDateGap == 7){
      setFilters((prev)=>({...prev,recentDays:"Week"}))
      return;
    }
    // FOR SETTING YESTERDAY IN DATE FILTER
    if(startDateGap == 30,31,29,28  ){
      setFilters((prev)=>({...prev,recentDays:"Month"}))
      // return;
    }
    if(startDateGap != 30,31,29,28,1,7  ){
      // console.log("ELSE")
      setFilters((prev)=>({...prev,recentDays:"Custom"}))
    }

    if(filters.recentDays =='All'  ){
      setRender(prev=>!prev)
      return
     }

    console.log(value)
  }
  //========================= HANDLE RECENT USER FUNCTION =========================

  

  const handleChange = (event) => {
    setAge(event.target.value);
  };
 
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data?.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    setIsOpen(false)
    setAnchorEl(null)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log("NEW PAGE=>",event,newPage)
    // if(filters.by_category !== 'all' && filters.recentDays ==='All' && filters.by_product_status === 'all'){
    // if(filters.by_category !== 'all'){
    //   setForCategoryPagination()
    //   return
    // }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

//############################# BULK UPLOAD SIDE BAR DRAWER FUNCTION #############################
  const handleOpenBulkUploadSidebar=()=>{
    setDrawerBulkUpload(true)
  }

  const handleCloseBulkUploadSideBar = ()=>{
      setDrawerBulkUpload(false)
  }
//############################# BULK UPLOAD SIDE BAR DRAWER FUNCTION #############################

//############################# BULK UPLOAD SIDE BAR DRAWER FUNCTION #############################
const handleOpenAddProductSidebar=()=>{
  setDrawerAddProduct(true)
}

const  handleCloseAddProductSideBar =()=>{
    setDrawerAddProduct(false);
    setRender(prev=>!prev)
  }
//############################# BULK UPLOAD SIDE BAR DRAWER FUNCTION #############################

    //############################# EDIT MAIN CATEGORY SIDE BAR DRAWER FUNCTION #############################
    const handleOpenProductTagSidebar=()=>{
      setDrawerProductTag(true)
      
    }
    
    const  handleCloseProductTagSideBar =()=>{
        setDrawerProductTag(false)
        setRender(prev=>!prev)
    
      }
    //############################# EDIT MAIN CATEGORY SIDE BAR DRAWER FUNCTION #############################


//############################# CLOSE DELETE CONFIRM MODAL FUNCTION #############################
const handleCloseConfimModal=()=>{
  setOpenDeleteConfimModal(false); 
  setIsOpen2(false)
}
//############################# CLOSE DELETE CONFIM MODAL FUNCTION #############################

//############################# HANDLE DELETE CATEGORIES FUNCTION #############################
const handleDleteProducts = async(value)=>{
  // console.log("VALUE FOR DELETE=>",value)
  await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/delete/product`,{data: value},{headers: {
      'Authorization': `token ${editable_config.FRONTEND_VALIDATOR}`,
    },withCredentials:true})
  .then(async res=>{
    // console.log("res?.data?.image_need_to_delete==>>",res?.data?.image_need_to_delete)
    console.log("res?.data?.image_need_to_delete With inner object ==>>",res?.data?.image_need_to_delete[0]?.product_images)

  setOpenDeleteConfimModal(false); 
  setRender(prev=>!prev)
 if(res?.data?.status){
  // ,image_need_to_delete:findImagesToDelete,
  //====== delete images from firebase =======
  for(let i=0;i < res?.data?.image_need_to_delete?.length;i++){
    for(let j=0; j < res?.data?.image_need_to_delete[i]?.product_images?.length; j++ ){
      console.log("res?.data?.image_need_to_delete[i]?.product_images[j]?.image_path=>",res?.data?.image_need_to_delete[i]?.product_images[j])
     await deleteImageFromFirebase(res?.data?.image_need_to_delete[i]?.product_images[j]?.path,res?.data?.image_need_to_delete[i]?.product_images[j]?.image_name,)
    }
  }
  //====== delete images from firebase =======


  setMessage((prev)=>({...prev,type:"success",message:"Product Deleted Successfully !"}))
  setSnackbarOpen(true);
  setFilters((prev)=>({...prev,by_category:'all'}))
 }
 if(!res?.data?.status){
  setMessage((prev)=>({...prev,type:'error',message:"An Unexpected Error occur !"}))
  setSnackbarOpen(true)
 }

  })
  .catch(err=>{
    console.log(err)
  setOpenDeleteConfimModal(false); 
  })
  setSelected([])
}
//############################# HANDLE DELETE CATEGORIES FUNCTION #############################

// ##################### SET AS NEW ARRIVALS ##################
const setAsNewArrival = async(value)=>{
  await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/set/products/as/new/arrivals`,{data:value},{headers: {
      'Authorization': `token ${editable_config.FRONTEND_VALIDATOR}`,
    },withCredentials:true})
  .then(res=>{
    console.log(res);
    setRender(prev=>!prev)
    setMessage((prev)=>({...prev,type:"success",message:"Product Added to New Arrivals Successfully !"}))
    setSnackbarOpen(true);
    setSelected([])

  })
  .catch(err=>{
    console.log(err);
    setMessage((prev)=>({...prev,type:"success",message:"Product Added to New Arrivals Failed !"}))
    setSnackbarOpen(true);
  })
}
// ##################### SET AS NEW ARRIVALS ##################


// ##################### REMOVE AS NEW ARRIVALS ##################
const removeAsNewArrival = async(value)=>{
  await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/remove/products/as/new/arrivals`,{data:value},{headers: {
      'Authorization': `token ${editable_config.FRONTEND_VALIDATOR}`,
    },withCredentials:true})
  .then(res=>{
    console.log(res);
    setRender(prev=>!prev)
    setMessage((prev)=>({...prev,type:"success",message:"Product Removed From New Arrivals Successfully !"}))
    setSnackbarOpen(true);
    setSelected([])


    
  })
  .catch(err=>{
    console.log(err);
    setMessage((prev)=>({...prev,type:"success",message:"Product Removed From New Arrivals Successfully !"}))
    setSnackbarOpen(true);
  })
}
// ##################### REMOVE AS NEW ARRIVALS ##################

// ##################### SET AS TRENDING PRODUCTS ##################
const setAsTrendingProducts = async(value)=>{
  await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/set/products/as/trending/products`,{data:value},{headers: {
      'Authorization': `token ${editable_config.FRONTEND_VALIDATOR}`,
    },withCredentials:true})
  .then(res=>{
    console.log(res);
    setRender(prev=>!prev)
    setMessage((prev)=>({...prev,type:"success",message:"Product Added to Trending Products Successfully !"}))
  setSnackbarOpen(true);
  setSelected([])

  })
  .catch(err=>{
    console.log(err);
    setMessage((prev)=>({...prev,type:"success",message:"Product Added to Trending Products Failed !"}))
    setSnackbarOpen(true);
  })
}
// ##################### SET AS TRENDING PRODUCTS ##################


// ##################### REMOVE AS TRENDING PRODUCTS ##################
const removeAsTrendingProducts = async(value)=>{
  await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/remove/products/as/trending/products`,{data:value},{headers: {
      'Authorization': `token ${editable_config.FRONTEND_VALIDATOR}`,
    },withCredentials:true})
  .then(res=>{
    console.log(res);
    setRender(prev=>!prev)
    setMessage((prev)=>({...prev,type:"success",message:"Product Removed From Trending Products Successfully !"}))
    setSnackbarOpen(true);
    setSelected([])


    
  })
  .catch(err=>{
    console.log(err);
    setMessage((prev)=>({...prev,type:"success",message:"Product Removed From Trending Products Successfully !"}))
    setSnackbarOpen(true);
  })
}
// ##################### REMOVE AS TRENDING PRODUCTS ##################




// ##################### SNACK BAR FUNCTIONs ##################
const handleCloseSnackbar = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setSnackbarOpen(false);
};
// ##################### SNACK BAR FUNCTIONs ##################

  //############################# EDIT CATEGORY SIDE BAR DRAWER FUNCTION #############################
  const handleOpenEditCategorySidebar=()=>{
    setDrawerEditCategory(true)
  }
  
  const  handleCloseEditProductSideBar =()=>{
      setDrawerEditCategory(false)
      setRender(prev=>!prev)
    }
  //############################# EDIT CATEGORY SIDE BAR DRAWER FUNCTION #############################

// go to edit product 
const goToEditProduct=(prod_id)=>{
  navigate(`/dashboard/edit/product/${prod_id}`)
}

const handleCloseProductLimitModal=()=>{
  setOpenProductLimitModal(false)
}


  // handle close video modal
  function handleCloseVideoModal(){
    setOpenVideoModal(false)
  }
  

  // handle open video modal
  function handleOpenVideoModal(){
    setOpenVideoModal(true)
  }



  return (
    <div className='custom-conatiner'>
    <Box sx={{ width: '100%' }}>

    <LoadingSpinner loading={loading} />
     {/*################ EDIT PRODUCT SIDEBAR  ################*/}
     <SideDrawer state={drawerEditCategory} toggleDrawerClose={handleCloseEditProductSideBar} toggleDrawerOpen={handleOpenEditCategorySidebar}
           ComponentData={<EditProduct handleClose={handleCloseEditProductSideBar} productId={productIdForEdit} />}
            />
      {/*################ EDIT PRODUCT SIDEBAR  ################*/}

  
  

 {/* #################### SANCKBAR MESSAGE ######################## */}
 <CustomizedSnackbars onOpen={snackbarOpen} type={message?.type} handleClose={handleCloseSnackbar}  message={message?.message} />
 
 {/* #################### SANCKBAR MESSAGE ######################## */}


    <Paper elevation={3} sx={{ width: '100%', mb: 2, borderRadius:1 }}>
   <div className='product-topbar-box vendor-topbar-box ' >
   <h3 className='' >Products</h3>
   
  {/* <div className='product-topbar-btn' > */}
         {/*################ ADD PRODUCTS SIDEBAR BUTTON ################*/}
            <Button  onClick={()=>navigate(`/dashboard/products/add/new`)} className='product-btn' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}> 
           Add Product
          </Button>
         {/*################ ADD PRODUCTS SIDEBAR BUTTON ###############*/}


  {/* </div> */}
   </div>
          {/* CONFIRM MODAL */}
          <ConfimModal open={openDeleteConfimModal} title="Delete Products" onYes={()=>handleDleteProducts(selected)} message="Are you sure you want to delete products?" handleClose={handleCloseConfimModal}  />
       {/* CONFIRM MODAL */}
   <div className='flex order-top-bar ' >
   <form onSubmit={handleSearch} className='flex product-search-bar-box '   >
   <TextField id="outlined-basic" type="search" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} fullWidth  label="Search In Products" placeholder='Search Anything...' variant="outlined"  InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }} />
   <Button className='search-btn' type="submit"  sx={{mx:2,height:54,px:4}} variant="contained" startIcon={<Iconify icon="ic:twotone-search" />} >
        Search
      </Button>
   </form>
   <div className="order-toolbar-selectbox-1 " >
   <FormControl fullWidth  >
                      {/* <InputLabel id="demo-select-small">Filter By Category</InputLabel> */}

                      <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={filters?.by_category}
        label="Filter By Categories"
        style={{textTransform:'capitalize'}}
        select
        onChange={handleCatgoryFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
        {/* <MenuItem value="" selected >
          <em>Status</em>
        </MenuItem> */}
      <MenuItem value='all'>All</MenuItem>
      {catgoryFilter?.map((value,index)=>(
        <MenuItem key={index} style={{textTransform:'capitalize'}} value={value?._id}>{value?._id}</MenuItem>

      ))}
        {/* <MenuItem value={20}>Hardware</MenuItem> */}
      </TextField>
      
     
      </FormControl>
   </div>
   <div className="order-toolbar-selectbox-2 " >
   <FormControl fullWidth  >
                      {/* <InputLabel id="demo-select-small">Filter By Category</InputLabel> */}

                      <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={filters?.by_type}
        label="Filter By Product Type"
        style={{textTransform:'capitalize'}}
        select
        onChange={handleProductTypeFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
        {/* <MenuItem value="" selected >
          <em>Status</em>
        </MenuItem> */}
      <MenuItem value='all'>All</MenuItem>
      <MenuItem style={{textTransform:'capitalize'}} value='new_arrivals'>New Arrivals</MenuItem>
      <MenuItem style={{textTransform:'capitalize'}} value='trending'>Trending Products</MenuItem>

        {/* <MenuItem value={20}>Hardware</MenuItem> */}
      </TextField>
      
     
      </FormControl>
   </div>
 
     <div className="order-toolbar-selectbox-2" >
     <FormControl fullWidth  >
     <TextField
        id="basic-button"
        InputProps={{      
          startAdornment: (
            <InputAdornment position="start">
               <CalendarMonthIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
               <ArrowDropDownIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        label="Recent Products"
        aria-readonly={true}
        value={filters?.recentDays}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu}
        
      />
      
      {/* </TextField> */}
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
         PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
           
          },
        }}
      >
        <div className='date-filter-box' >
        <DateRangePicker
 
 onChange={item => {setStateDate([item.selection])
  handleRecentUsers(item.selection)

  }}
 showSelectionPreview={false}
 showPreview={false}
 moveRangeOnFirstSelection={false}
 months={1}
 
 ranges={stateDate}
 direction="vertical"
/>
<div className='date-filter-reset-btn' >

<Button onClick={()=>{setFilters((prev)=>({...prev,recentDays:'All'}))
                                                              setStateDate([ {
                                                                
                                                                startDate: '',
                                                                endDate: '',
                                                                key: 'selection'
                                                              }]);handleClose()
                                                            }}  variant="contained" > Reset</Button>
                                                            </div>
        </div>
{/* <MenuItem value={'today'}> </MenuItem> */}


      </Menu>
      </FormControl>
      
     </div>
     {/* <div className='order-toolbar-selectbox-2 hide-mobile' >

   
     <FormControl fullWidth  >
      <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={filters?.by_product_status}
        label="Filter By Product Status"
        style={{textTransform:'capitalize'}}
        select
        onChange={handleProductFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
        
         <MenuItem value={'all'}>All </MenuItem>
         {productStatusFilter?.map((value)=>(
           <MenuItem style={{textTransform:'capitalize'}} key={value._id} value={value?.name}> {value?.name}</MenuItem>

         ))}
   
      </TextField>
      </FormControl>
      </div> */}
      {/*============== DESKTOP MORE ICONS=============== */}
      {/* <div className='more-icon-btn' >
    <Tooltip title="Filter list">
            <>
       <MoreVertOutlinedIcon style={{cursor:"pointer"}} ref={ref2} onClick={() => setIsOpen2(true)} fontSize='medium' />
       

       <Menu
        open={isOpen2}
        anchorEl={ref2.current}
        onClose={() => setIsOpen2(false)}
        PaperProps={{
          sx: { width: 300, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
       
   <div className="filter-toolbar-selectbox-1 " >
   <FormControl fullWidth  >
      <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={filters?.by_product_status}
        label="Filter By Product Status"
        style={{textTransform:'capitalize'}}
        select
        onChange={handleProductFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
        
         <MenuItem value={'all'}>All </MenuItem>
         {productStatusFilter?.map((value)=>(
           <MenuItem style={{textTransform:'capitalize'}} key={value._id} value={value?.name}> {value?.name}</MenuItem>

         ))}
   
      </TextField>
      </FormControl>
  
   </div>
       
        <div className="filter-toolbar-selectbox-1 " >
   <FormControl fullWidth  >
   <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Filter By Status"
   
        select
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
       
         <MenuItem value={10}>Cloths </MenuItem>
        <MenuItem value={10}> Hardware</MenuItem>
        <MenuItem value={20}>Cosmetic</MenuItem>
      </TextField>
      </FormControl>
   </div>


  
        <div className="filter-toolbar-selectbox-1 " >
   <FormControl fullWidth  >
   <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Filter By Status"
   
        select
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
      
         <MenuItem value={10}>Cloths </MenuItem>
        <MenuItem value={10}> Hardware</MenuItem>
        <MenuItem value={20}>Cosmetic</MenuItem>
      </TextField>
      </FormControl>
   </div>
 
 <div className="filter-toolbar-selectbox-button  " >
  <Button  onClick={handleResetFilter} fullWidth variant="contained" startIcon={<Iconify icon="carbon:update-now" />}> 
    Reset Filter
         </Button>
  </div>
        
        
        <div className="filter-toolbar-selectbox-button  " >
<Button  onClick={()=>setIsOpen(false)} fullWidth variant="outlined" startIcon={<Iconify icon="eva:download-fill" />}> 
Download
     </Button>
</div>

      </Menu>
      </>

        </Tooltip>
       </div> */}
     {/*============== DESKTOP MORE ICONS=============== */}

     {/*============== MOBILE MORE ICONS=============== */}

     {/* <div className='more-text-btn'  >
      <Tooltip title="Filter list">
            <>
      <p  style={{display:"flex",justifyContent:"end"}} ref={ref} onClick={() => setIsOpen(true)} >More Option <ExpandMoreIcon /></p>
      
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 300, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <p className='close-menu-btn' style={{color:palette.primary.main}} onClick={()=>setIsOpen(false)} ><Iconify icon="ci:close-small" />  </p>
        <div className="filter-toolbar-selectbox-1 " >
   <FormControl fullWidth  >

                      <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={filters?.by_category}
        label="Filter By Category"
        style={{textTransform:'capitalize'}}
        select
        onChange={handleCatgoryFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
      <MenuItem value='all'>All</MenuItem>
      {catgoryFilter?.map((value,index)=>(
        <MenuItem key={index} style={{textTransform:'capitalize'}} value={value?._id}>{value?._id}</MenuItem>

      ))}
      </TextField>
      
     
      </FormControl>
   </div>
   <div className="filter-toolbar-selectbox-1 " >
   <FormControl fullWidth  >

                      <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={filters?.by_type}
        label="Filter By Product Type"
        style={{textTransform:'capitalize'}}
        select
        onChange={handleProductTypeFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
      <MenuItem value='all'>All</MenuItem>
      <MenuItem style={{textTransform:'capitalize'}} value='new_arrivals'>New Arrivals</MenuItem>
      <MenuItem style={{textTransform:'capitalize'}} value='trending'>Trending Products</MenuItem>

      </TextField>
      
     
      </FormControl>
   </div>
   <div className="filter-toolbar-selectbox-1" >
     <FormControl fullWidth  >
     <TextField
        id="basic-button"
        InputProps={{      
          startAdornment: (
            <InputAdornment position="start">
               <CalendarMonthIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
               <ArrowDropDownIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        label="Recent Products"
        aria-readonly={true}
        value={filters?.recentDays}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu}
        
      />
      
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
         PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
           
          },
        }}
      >
        <div className='date-filter-box' >
        <DateRangePicker
 
 onChange={item => {setStateDate([item.selection])
  handleRecentUsers(item.selection)

  }}
 showSelectionPreview={false}
 showPreview={false}
 moveRangeOnFirstSelection={false}
 months={1}
 
 ranges={stateDate}
 direction="vertical"
/>
<div className='date-filter-reset-btn' >

<Button onClick={()=>{setFilters((prev)=>({...prev,recentDays:'All'}))
                                                              setStateDate([ {
                                                                
                                                                startDate: '',
                                                                endDate: '',
                                                                key: 'selection'
                                                              }]);handleClose();
                                                            }}  variant="outlined" > Reset</Button>
                                                            <div>
                                                            <Button onClick={handleClose}  variant="contained" > Apply</Button>
                                                            </div>
                                                            </div>
        </div>


      </Menu>
      </FormControl>
      
     </div>

   <div className="filter-toolbar-selectbox-button  " >
  <Button  onClick={handleResetFilter} fullWidth variant="contained" startIcon={<Iconify icon="carbon:update-now" />}> 
    Reset Filter
         </Button>
  </div>
        
            <div className="filter-toolbar-selectbox-button  " >
  <Button  onClick={()=>setIsOpen(false)} fullWidth variant="outlined" startIcon={<Iconify icon="akar-icons:download" />}> 
    Export
         </Button>
  </div>
      </Menu>
    </>

        </Tooltip>
     </div> */}
     {/*============== MOBILE MORE ICONS=============== */}
    
   </div>

    </Paper>

      <Paper elevation={3} sx={{ width: '100%', mb: 2, borderRadius:1 }}>
     
      {/* <VendorListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
      {/* <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} /> */}
        <EnhancedTableToolbar 
        numSelected={selected.length} 
        setAsNewArrival={setAsNewArrival} 
        removeAsNewArrival={removeAsNewArrival}
        removeAsTrendingProducts={removeAsTrendingProducts}
        setAsTrendingProducts={setAsTrendingProducts}
        selected={selected} 
        setOpenDeleteConfimModal={setOpenDeleteConfimModal} 
        productCount={productCount} />
        <TableContainer  >
          <Table
          id='products-export-to-xlsx'
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              
            />
            
              <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                     
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                         onClick={(event) => handleClick(event, row._id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell className='product_image_and_icon'
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                         style={{textTransform:'capitalize'}} 
                      >
                        <div  >
                       {row?.new_arrival &&  <div className='product-new-arrival-conatiner' >
                        <p className='new-arrival-star'  >⭐️</p>
                        {/* <p class="card-price">1250 р.</p> */}
                        </div>}
                       {row?.trending_product &&  <div className='trending-products-container' >
                        <p className='trending-products-icon'  >🔥</p>
                        </div>}
                        {/* <a target='_blank' href={row?.product_images[0]?.image_url} > */}
                        <img className='product-table-image' alt="product" src={row?.product_images[0]?.image_url ? `${row?.product_images[0]?.image_url}` :noImage } />
                        {/* </a> */}
                        </div>
                      </TableCell>
                      <TableCell onClick={()=>goToEditProduct(row?._id)} className='clickable-text' style={{textTransform:'capitalize'}} align="left">{row.product_name?.slice(0,22)}{row.product_name?.length > 16 && "..."}  </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        cals
                         style={{textTransform:'capitalize'}} 
                      >{row.product_code?.slice(0,22)}{row.product_code?.length > 16 && "..."}</TableCell>
                      <TableCell  style={{textTransform:'capitalize'}} align="left">{row.product_main_category}>>{row.product_category}{row.product_subcategory && '>>'+ row.product_subcategory}</TableCell>
                      {/* <TableCell  style={{textTransform:'capitalize'}} align="center">{row.product_regular_price}</TableCell>
                      <TableCell  style={{textTransform:'capitalize'}} align="center">{row.product_sale_price}</TableCell> */}
                      {/* <TableCell style={{textTransform:'capitalize'}}  align="center">{row.product_gst}</TableCell> */}
                    
                    <TableCell style={{textTransform:'capitalize'}}  align="left">
                      {row.product_original_quantity}
                      </TableCell>
                    <TableCell style={{textTransform:'capitalize'}}  align="center">
                    <p style={{textDecorationLine:'line-through',fontSize:12,color:'#ff0000ab',fontWeight:'500'}} > ₹{ row?.product_regular_price}</p>
                    <p style={{color:palette.primary.main,fontWeight:'600'}} > ₹{ row?.product_sale_price}</p>
                     </TableCell>
                    

                    <TableCell align="left">
                      {/* <EditOutlinedIcon fontSize='small' />  */}
                    {/* <AppRegistrationIcon style={{cursor:'pointer'}} fontSize='small' onClick={()=>{setproductIdForEdit(row._id);setDrawerEditCategory(true) }}  /> */}
                    <AppRegistrationIcon style={{cursor:'pointer'}} fontSize='small' onClick={()=>goToEditProduct(row?._id)}  />
                      {/* <DeleteOutlineOutlinedIcon fontSize='small' /> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
                 {!data.length >0 &&   <TableCell colSpan={9}> <div className='search-not-found' >
                  <img className='search-not-found-img' src={searchNotFound} alt="searchNotFound" />
                  <Typography
          
          variant="h6"
          id="tableTitle"
          component="div"
          sx={{color:'#ababab'}}
        >
          No Products Found!!
        </Typography>
                </div> </TableCell> }
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='pagination-table-style-box'  >
                  <p className='pagination-table-style' >
                  {currentPage} of {totalPages || 1} Page
                    </p> 
                    <IconButton onClick={handleOnClickPagePrevious} ><Iconify icon="material-symbols:keyboard-arrow-left" /></IconButton>
                    <IconButton onClick={handleOnClickPageNext } ><Iconify icon="material-symbols:keyboard-arrow-right" /></IconButton>
                    
                    
                </div>
        {/* <TablePagination
          rowsPerPageOptions={[25]}
          component="div"
          count={productCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
    </div>
  );
}
