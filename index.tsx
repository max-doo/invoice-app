import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { InvoicePage } from './invoice.tsx';
import { IssuedInvoiceDetail } from './IssuedInvoiceDetail.tsx';

// 可开票订单（没有status字段或status为null）
const mockSaleOrders = [
    { id: 1, date: '2023年10月26日 14:20', name: '游戏币套餐', amount: 30.00, selected: false, orderNumber: 'NO20231026142051', source: '小程序', items: [
        { name: '游戏币套餐', quantity: 1, price: 30.00 }
    ]},
    { id: 2, date: '2023年10月26日 12:15', name: '次票;游戏币套餐;次卡;会员充值;抖音游戏币套餐', amount: 200.00, selected: false, orderNumber: 'NO20231026121532', source: '收银台', items: [
        { name: '次票', quantity: 1, price: 20.00 },
        { name: '游戏币套餐', quantity: 2, price: 30.00 },
        { name: '次卡', quantity: 1, price: 55.50 },
        { name: '会员充值', quantity: 1, price: 50.00 },
        { name: '抖音游戏币套餐', quantity: 1, price: 44.50 }
    ]},
    { id: 3, date: '2023年10月25日 18:30', name: '游戏币套餐', amount: 30.00, selected: false, orderNumber: 'NO20231025183011', source: '小程序', items: [
        { name: '游戏币套餐', quantity: 1, price: 30.00 }
    ]},
    { id: 4, date: '2023年10月25日 13:55', name: '次卡', amount: 55.50, selected: false, orderNumber: 'NO20231025135545', source: '收银台', items: [
        { name: '次卡', quantity: 1, price: 55.50 }
    ]},
    { id: 5, date: '2023年10月24日 11:05', name: '会员充值', amount: 100.00, selected: false, orderNumber: 'NO20231024110559', source: '小程序', items: [
        { name: '会员充值', quantity: 1, price: 100.00 }
    ]},
];

const mockDeductionOrders = [
    { id: 6, date: '2023年10月26日 10:00', name: '美团游戏币套餐', amount: 150.00, selected: false, orderNumber: 'NO20231026100023', source: '美团', items: [
        { name: '美团游戏币套餐', quantity: 1, price: 150.00 }
    ]},
    { id: 7, date: '2023年10月25日 09:30', name: '抖音次票', amount: 88.00, selected: false, orderNumber: 'NO20231025093018', source: '抖音', items: [
        { name: '抖音次票', quantity: 1, price: 88.00 }
    ]},
    { id: 8, date: '2023年10月24日 16:45', name: '美团游戏币套餐', amount: 200.00, selected: false, orderNumber: 'NO20231024164504', source: '美团', items: [
        { name: '美团游戏币套餐', quantity: 1, price: 200.00 }
    ]},
];

// 其它订单（有status字段：已开票、不可开票、开票中）
const mockOtherSaleOrders = [
    { id: 11, date: '2023年10月23日 10:00', name: '游戏币套餐', amount: 50.00, selected: false, orderNumber: 'NO20231023100011', source: '小程序', status: '已开票', items: [
        { name: '游戏币套餐', quantity: 1, price: 50.00 }
    ]},
    { id: 12, date: '2023年10月22日 15:30', name: '会员充值', amount: 200.00, selected: false, orderNumber: 'NO20231022153012', source: '收银台', status: '不可开票', items: [
        { name: '会员充值', quantity: 1, price: 200.00 }
    ]},
    { id: 13, date: '2023年10月21日 09:20', name: '次卡', amount: 100.00, selected: false, orderNumber: 'NO20231021092013', source: '小程序', status: '开票中', items: [
        { name: '次卡', quantity: 1, price: 100.00 }
    ]},
];

const mockOtherDeductionOrders = [
    { id: 15, date: '2023年10月23日 11:00', name: '美团游戏币套餐', amount: 120.00, selected: false, orderNumber: 'NO20231023110015', source: '美团', status: '已开票', items: [
        { name: '美团游戏币套餐', quantity: 1, price: 120.00 }
    ]},
    { id: 16, date: '2023年10月22日 16:30', name: '抖音次票', amount: 88.00, selected: false, orderNumber: 'NO20231022163016', source: '抖音', status: '开票中', items: [
        { name: '抖音次票', quantity: 1, price: 88.00 }
    ]},
    { id: 17, date: '2023年10月21日 10:20', name: '美团游戏币套餐', amount: 150.00, selected: false, orderNumber: 'NO20231021102017', source: '美团', status: '不可开票', items: [
        { name: '美团游戏币套餐', quantity: 1, price: 150.00 }
    ]},
];

const mockIssuedInvoices = [
    {
        id: 10,
        datetime: '2025.10.20 周一 11:20',
        service: '娱乐服务',
        type: '电子发票',
        amount: 150.00,
        status: '开票失败',
        buyerName: '测试科技有限公司',
        taxId: '91310000MA1TEST001',
        email: 'test@test-tech.com',
        orderCount: 1,
        orders: [
            { id: 20, date: '2023年10月29日 11:20', name: '次票', amount: 150.00, orderNumber: 'NO20231029112000', source: '收银台', items: [
                { name: '次票', quantity: 1, price: 150.00 }
            ]},
        ],
        address: '上海市徐汇区测试路100号',
        phone: '021-12345678',
        bank: '工商银行上海分行',
        account: '1111222233334444',
        remarks: '开票失败',
        failureReason: '税号格式不正确，请检查购方税号'
    },
    {
        id: 9,
        datetime: '2025.10.20 周一 09:15',
        service: '娱乐服务',
        type: '电子发票',
        amount: 320.00,
        status: '重开失败',
        buyerName: '创新科技有限公司',
        taxId: '91310000MA1INNO001',
        email: 'finance@innovate-tech.com',
        orderCount: 2,
        orders: [
            { id: 18, date: '2023年10月29日 09:15', name: '会员充值', amount: 200.00, orderNumber: 'NO20231029091500', source: '小程序', items: [
                { name: '会员充值', quantity: 1, price: 200.00 }
            ]},
            { id: 19, date: '2023年10月29日 09:20', name: '游戏币套餐', amount: 120.00, orderNumber: 'NO20231029092000', source: '小程序', items: [
                { name: '游戏币套餐', quantity: 1, price: 120.00 }
            ]},
        ],
        address: '上海市静安区创新大道200号',
        phone: '021-87654321',
        bank: '农业银行上海分行',
        account: '2222333344445555',
        remarks: '重开失败',
        failureReason: '原发票状态异常，无法重开，请联系客服'
    },
    {
        id: 8,
        datetime: '2025.10.19 周日 18:30',
        service: '娱乐服务',
        type: '电子发票',
        amount: 450.00,
        status: '退票失败',
        buyerName: '卓越企业有限公司',
        taxId: '91310000MA1EXCE001',
        email: 'accounting@excellent-corp.com',
        orderCount: 1,
        orders: [
            { id: 17, date: '2023年10月28日 18:30', name: '会员充值', amount: 450.00, orderNumber: 'NO20231028183000', source: '小程序', items: [
                { name: '会员充值', quantity: 1, price: 450.00 }
            ]},
        ],
        address: '上海市黄浦区卓越路300号',
        phone: '021-55667788',
        bank: '交通银行上海分行',
        account: '3333444455556666',
        remarks: '退票失败',
        failureReason: '发票已超过退票期限，无法办理退票'
    },
    {
        id: 7,
        datetime: '2025.10.19 周日 16:00',
        service: '娱乐服务',
        type: '电子发票',
        amount: 180.00,
        status: '开票取消',
        buyerName: '临时测试公司',
        taxId: '91310000MA1TEMP001',
        email: 'temp@temp-company.com',
        orderCount: 1,
        orders: [
            { id: 16, date: '2023年10月28日 16:00', name: '次票', amount: 180.00, orderNumber: 'NO20231028160000', source: '收银台', items: [
                { name: '次票', quantity: 1, price: 180.00 }
            ]},
        ],
        address: '上海市普陀区临时路50号',
        phone: '021-99887766',
        bank: '浦发银行上海分行',
        account: '4444555566667777',
        remarks: '开票取消',
        failureReason: '用户主动取消开票申请'
    },
    {
        id: 11,
        datetime: '2025.10.19 周日 15:00',
        service: '娱乐服务',
        type: '电子发票',
        amount: 260.00,
        status: '重开中',
        buyerName: '重开测试有限公司',
        taxId: '91310000MA1REIS001',
        email: 'reissue@reissue-test.com',
        orderCount: 1,
        orders: [
            { id: 15, date: '2023年10月28日 15:00', name: '会员充值', amount: 260.00, orderNumber: 'NO20231028150000', source: '小程序', items: [
                { name: '会员充值', quantity: 1, price: 260.00 }
            ]},
        ],
        address: '上海市虹口区重开路150号',
        phone: '021-11223344',
        bank: '民生银行上海分行',
        account: '5555666677778888',
        remarks: '正在重开发票中'
    },
    {
        id: 6,
        datetime: '2025.10.19 周日 14:30',
        service: '娱乐服务',
        type: '电子发票',
        amount: 280.00,
        status: '退票中',
        buyerName: '智能科技有限公司',
        taxId: '91310000MA1FL3NX8C',
        email: 'admin@smart-tech.com',
        orderCount: 1,
        orders: [
            { id: 12, date: '2023年10月28日 14:30', name: '会员充值', amount: 280.00, orderNumber: 'NO20231028143000', source: '小程序', items: [
                { name: '会员充值', quantity: 1, price: 280.00 }
            ]},
        ],
        address: '上海市浦东新区张江高科技园区',
        phone: '021-66778899',
        bank: '中国银行上海分行',
        account: '1234567890123456',
        remarks: '申请退票中'
    },
    {
        id: 5,
        datetime: '2025.10.18 周六 16:45',
        service: '娱乐服务',
        type: '电子发票',
        amount: 350.00,
        status: '已重开',
        buyerName: '云端科技有限公司',
        taxId: '91310115MA1K4EFGH2',
        email: 'invoice@cloud-tech.com',
        orderCount: 2,
        orders: [
            { id: 13, date: '2023年10月27日 16:45', name: '次票', amount: 150.00, orderNumber: 'NO20231027164500', source: '收银台', items: [
                { name: '次票', quantity: 1, price: 150.00 }
            ]},
            { id: 14, date: '2023年10月27日 16:50', name: '游戏币套餐', amount: 200.00, orderNumber: 'NO20231027165000', source: '小程序', items: [
                { name: '游戏币套餐', quantity: 1, price: 200.00 }
            ]},
        ],
        address: '上海市长宁区天山路999号',
        phone: '021-55443322',
        bank: '建设银行上海分行',
        account: '5678901234567890',
        remarks: '已重新开具发票'
    },
    {
        id: 4,
        datetime: '2025.10.18 周六 10:00',
        service: '娱乐服务',
        type: '电子发票',
        amount: 500.00,
        status: '开票中',
        buyerName: '未来创新集团',
        taxId: '91310115MA1K4ABCD1',
        email: 'finance@future-innovate.com',
        orderCount: 1,
        orders: [
            { id: 11, date: '2023年10月27日 10:00', name: '会员充值', amount: 500.00, orderNumber: 'NO20231027100000', source: '小程序', items: [
                { name: '会员充值', quantity: 1, price: 500.00 }
            ]},
        ],
        address: '上海市科技园区未来大道1号',
        phone: '021-11223344',
        bank: '未来银行上海分行',
        account: '9876543210987654',
        remarks: '加急处理'
    },
    {
        id: 2,
        datetime: '2025.10.16 周四 09:15',
        service: '娱乐服务',
        type: '电子发票',
        amount: 88.00,
        status: '已开票',
        buyerName: '上海示例信息技术有限公司',
        taxId: '91310115MA1K395687',
        email: 'invoice@example-sh.com',
        orderCount: 1,
        orders: [
            { id: 7, date: '2023年10月25日 09:30', name: '抖音游戏币套餐', amount: 88.00, orderNumber: 'NO20231025093018', source: '抖音', items: [
                { name: '抖音游戏币套餐', quantity: 1, price: 88.00 }
            ]},
        ],
        address: '上海市浦东新区世纪大道2001号',
        phone: '021-87654321',
        bank: '招商银行上海陆家嘴支行',
        account: '6214830987654321',
        remarks: ''
    },
    {
        id: 3,
        datetime: '2025.10.15 周三 20:50',
        service: '娱乐服务',
        type: '电子发票',
        amount: 120.50,
        status: '已退票',
        buyerName: '个人',
        taxId: 'N/A',
        email: 'user@example-personal.com',
        orderCount: 2,
        orders: [
            { id: 4, date: '2023年10月25日 13:55', name: '单点服务', amount: 55.50, orderNumber: 'NO20231025135545', source: '收银台', items: [
                { name: '单点服务', quantity: 1, price: 55.50 }
            ]},
            { id: 10, date: '2023年10月25日 14:00', name: '附加项目', amount: 65.00, orderNumber: 'NO20231025140010', source: '小程序', items: [
                { name: '附加项目', quantity: 1, price: 65.00 }
            ]},
        ],
        address: '',
        phone: '',
        bank: '',
        account: '',
        remarks: '个人发票无备注。'
    },
];

const formatDateWithWeekday = (dateString: string): string => {
    const parsableDateString = dateString
        .replace('年', '-')
        .replace('月', '-')
        .replace('日', '');
    const date = new Date(parsableDateString);
    if (isNaN(date.getTime())) {
        return dateString.replace(/年|月/g, '.').replace(/日/, '');
    }

    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.getDay()];

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}.${month}.${day} ${weekday} ${hours}:${minutes}`;
};


const App = () => {
    const [view, setView] = useState('list');
    const [activeTopTab, setActiveTopTab] = useState('sales');
    const [activeBottomTab, setActiveBottomTab] = useState('issue');
    const [orderFilter, setOrderFilter] = useState('invoiceable'); // 'invoiceable' 可开票订单, 'other' 其它订单
    const [orders, setOrders] = useState(mockSaleOrders);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const selectedOrders = useMemo(() => orders.filter(o => o.selected), [orders]);
    const totalAmount = useMemo(() => selectedOrders.reduce((sum, order) => sum + order.amount, 0), [selectedOrders]);

    const isAllSelected = useMemo(() => orders.length > 0 && orders.every(order => order.selected), [orders]);
    const isAnySelected = useMemo(() => orders.some(order => order.selected), [orders]);

    // 根据订单类型和筛选器更新订单列表
    useEffect(() => {
        let allOrders = [];
        if (activeTopTab === 'sales') {
            allOrders = orderFilter === 'invoiceable' ? mockSaleOrders : mockOtherSaleOrders;
        } else {
            allOrders = orderFilter === 'invoiceable' ? mockDeductionOrders : mockOtherDeductionOrders;
        }
        setOrders(allOrders.map(o => ({...o, selected: false})));
    }, [activeTopTab, orderFilter]);

    useEffect(() => {
        if (activeBottomTab !== 'issue' && view !== 'list') {
            setView('list');
        }
    }, [activeBottomTab, view]);

    const handleSelectOrder = (id) => {
        // 其它订单模式下不允许选择
        if (orderFilter === 'other') {
            return;
        }
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id ? { ...order, selected: !order.selected } : order
            )
        );
    };

    const handleSelectAll = () => {
        // 其它订单模式下不允许全选
        if (orderFilter === 'other') {
            return;
        }
        const newSelectedState = !isAllSelected;
        setOrders(prevOrders =>
            prevOrders.map(order => ({ ...order, selected: newSelectedState }))
        );
    };

    const handleNext = () => {
        if (isAnySelected) {
            setView('invoice');
        }
    };
    
    const handleBackFromInvoice = () => {
        setView('list');
    };

    const handleGoToHistory = () => {
        setActiveBottomTab('issued');
        setView('list');
    };

    const handleSelectInvoice = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleBackFromDetail = () => {
        setSelectedInvoice(null);
    };

    const handleBackFromMain = () => {
        // This is the main page, so there's nowhere to go back to.
        // In a real app, this might close the webview.
    };

    if (selectedInvoice) {
        return (
            <IssuedInvoiceDetail
                invoice={selectedInvoice}
                onBack={handleBackFromDetail}
            />
        );
    }

    if (view === 'invoice') {
        return (
            <InvoicePage
                totalAmount={totalAmount}
                selectedOrders={selectedOrders}
                onBack={handleBackFromInvoice}
                onGoToHistory={handleGoToHistory}
            />
        );
    }

    const headerTitle = activeBottomTab === 'issue' ? '发票开具' : '开票记录';

    return (
        <>
            <div className="app-container">
                <Header 
                    title={headerTitle}
                    onBack={handleBackFromMain}
                />
                {activeBottomTab === 'issue' ? (
                    <>
                        <OrderTypeTabs activeTab={activeTopTab} onTabChange={setActiveTopTab} />
                        <OrderFilterTabs activeFilter={orderFilter} onFilterChange={setOrderFilter} />
                        <OrderList orders={orders} onSelectOrder={handleSelectOrder} orderFilter={orderFilter} />
                    </>
                ) : (
                    <IssuedInvoicesView invoices={mockIssuedInvoices} onSelectInvoice={handleSelectInvoice} />
                )}
                 {activeBottomTab === 'issue' && orderFilter === 'invoiceable' && (
                    <ActionBar
                        isAllSelected={isAllSelected}
                        isAnySelected={isAnySelected}
                        onSelectAll={handleSelectAll}
                        onNext={handleNext}
                    />
                )}
            </div>
            <BottomNav activeTab={activeBottomTab} onTabChange={setActiveBottomTab} />
        </>
    );
};

interface HeaderProps {
    title: string;
    onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => (
    <header className="header">
        {onBack &&
            <button onClick={onBack} className="header-back-btn" aria-label="Back">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" /></svg>
            </button>
        }
        <h1 className="header-title">{title}</h1>
    </header>
);

// 订单类型tabs组件
const OrderTypeTabs = ({ activeTab, onTabChange }) => (
    <div className="order-type-tabs-container">
        <div className="order-type-tabs">
            <button
                className={`order-type-tab ${activeTab === 'sales' ? 'active' : ''}`}
                onClick={() => onTabChange('sales')}
            >
                销售订单
            </button>
            <button
                className={`order-type-tab ${activeTab === 'write-off' ? 'active' : ''}`}
                onClick={() => onTabChange('write-off')}
            >
                核销订单
            </button>
        </div>
    </div>
);

// 订单筛选器tabs组件（可开票订单/其它订单）
const OrderFilterTabs = ({ activeFilter, onFilterChange }) => (
    <div className="order-filter-tabs-container">
        <div className="order-filter-tabs">
            <button
                className={`order-filter-tab ${activeFilter === 'invoiceable' ? 'active' : ''}`}
                onClick={() => onFilterChange('invoiceable')}
            >
                可开票订单
            </button>
            <button
                className={`order-filter-tab ${activeFilter === 'other' ? 'active' : ''}`}
                onClick={() => onFilterChange('other')}
            >
                其它订单
            </button>
        </div>
    </div>
);

// 订单列表组件，支持显示订单状态，其它订单不可选择
const OrderList = ({ orders, onSelectOrder, orderFilter }) => {
    const isOtherOrders = orderFilter === 'other';
    
    const getStatusClass = (status) => {
        switch (status) {
            case '已开票':
                return 'status-issued';
            case '不可开票':
                return 'status-uninvoiceable';
            case '开票中':
                return 'status-invoicing';
            default:
                return '';
        }
    };

    return (
        <main className="order-list">
            {orders.map(order => (
                <div
                    key={order.id}
                    className={`order-card ${order.selected ? 'selected' : ''} ${isOtherOrders ? 'readonly' : ''}`}
                    onClick={() => !isOtherOrders && onSelectOrder(order.id)}
                >
                    <div className="order-card-content">
                        {!isOtherOrders && (
                            <div className={`custom-checkbox ${order.selected ? 'checked' : ''}`}></div>
                        )}
                        <div className="order-details">
                             <div className="order-name-wrapper">
                                <p className="order-name">{order.name}</p>
                                <span className="order-source-tag">{order.source}</span>
                            </div>
                            {isOtherOrders && order.status && (
                                <span className={`order-status-tag ${getStatusClass(order.status)}`}>
                                    {order.status}
                                </span>
                            )}
                        </div>
                        <span className="order-amount">{order.amount.toFixed(2)}元</span>
                    </div>
                    <div className="order-card-footer">
                         <div className="order-date">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#999999"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                            <span>{formatDateWithWeekday(order.date)}</span>
                        </div>
                        <div className="order-number">
                            订单编号: {order.orderNumber}
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
};

const IssuedInvoicesView = ({ invoices, onSelectInvoice }) => {
    if (!invoices || invoices.length === 0) {
        return (
             <div className="placeholder-view">
                <h2>开票记录</h2>
                <p>这里会显示您已开具的发票列表。</p>
            </div>
        );
    }

    const getInvoiceStatusClass = (status) => {
        switch (status) {
            case '已退票':
                return 'refunded';
            case '开票中':
                return 'invoicing';
            case '退票中':
                return 'refunding';
            case '已重开':
                return 'reissued';
            case '重开中':
                return 'reissuing';
            case '开票失败':
                return 'invoice-failed';
            case '重开失败':
                return 'reissue-failed';
            case '退票失败':
                return 'refund-failed';
            case '开票取消':
                return 'invoice-cancelled';
            default:
                return '';
        }
    };

    return (
        <main className="issued-invoices-list">
            {invoices.map(invoice => (
                <div key={invoice.id} className="invoice-card" onClick={() => onSelectInvoice(invoice)}>
                    <div className="invoice-card-header">
                        <div className="invoice-date-time">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#999999"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                            <span>{invoice.datetime}</span>
                        </div>
                        <div className="view-details-link">
                           <span>查看详情</span>
                           <span className="arrow-icon">&gt;</span>
                        </div>
                    </div>
                    <div className="invoice-card-body">
                        <div>
                            <span className="service-name">{invoice.service}</span>
                            <span className={`invoice-tag ${getInvoiceStatusClass(invoice.status)}`}>{invoice.status}</span>
                        </div>
                        <span className="invoice-amount">{invoice.amount.toFixed(2)} 元</span>
                    </div>
                    <div className="invoice-card-footer">
                        <span>{invoice.buyerName}</span>
                        <span>{invoice.taxId}</span>
                    </div>
                </div>
            ))}
        </main>
    );
};


const ActionBar = ({ isAllSelected, isAnySelected, onSelectAll, onNext }) => (
    <div className="action-bar">
        <div className="select-all-container" onClick={onSelectAll}>
            <div className={`custom-checkbox ${isAllSelected ? 'checked' : ''}`}></div>
            <span>全选</span>
        </div>
        <button className="next-button" disabled={!isAnySelected} onClick={onNext}>
            开具发票
        </button>
    </div>
);

const BottomNav = ({ activeTab, onTabChange }) => (
    <nav className="bottom-nav">
        <button
            className={`nav-item ${activeTab === 'issue' ? 'active' : ''}`}
            onClick={() => onTabChange('issue')}
            aria-label="发票开具"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/></svg>
            <span>发票开具</span>
        </button>
        <button
            className={`nav-item ${activeTab === 'issued' ? 'active' : ''}`}
            onClick={() => onTabChange('issued')}
            aria-label="开票记录"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
            <span>开票记录</span>
        </button>
    </nav>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);