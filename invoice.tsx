import React, { useState } from 'react';
import './invoice.css';

const SubmissionSuccessPage = ({ onGoToHomepage, onGoToHistory }) => {
    return (
        <div className="submission-success-page">
            <header className="invoice-form-header">
                <button onClick={onGoToHomepage} className="invoice-header-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
                </button>
            </header>
            <main className="success-content">
                <div className="success-icon-container">
                    <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                <h1 className="success-title">提交成功</h1>
                <div className="success-info-box">
                    <div className="info-box-icon">
                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#555"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                    </div>
                    <p>开票成功，请注意查收，如您需要重开或者重新发送发票，可以前往【开票记录】中进行重新开票与重新发送发票。</p>
                </div>
                <div className="success-actions">
                    <button className="btn-homepage" onClick={onGoToHomepage}>订单首页</button>
                    <button className="btn-history" onClick={onGoToHistory}>开票记录</button>
                </div>
            </main>
        </div>
    );
};

const MoreInfoPage = ({ initialData, onSave, onBack }) => {
    const [address, setAddress] = useState(initialData.address || '');
    const [phone, setPhone] = useState(initialData.phone || '');
    const [bank, setBank] = useState(initialData.bank || '');
    const [account, setAccount] = useState(initialData.account || '');
    const [remarks, setRemarks] = useState(initialData.remarks || '');

    const handleConfirm = () => {
        onSave({ address, phone, bank, account, remarks });
    };

    return (
        <div className="invoice-form-page">
            <header className="invoice-form-header">
                <button onClick={onBack} className="invoice-header-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
                </button>
                <h1>更多内容</h1>
            </header>

            <main className="more-info-main">
                <section className="more-info-group">
                    <div className="more-info-field">
                        <div className="field-header">
                            <label>地址</label>
                            <span className="char-counter">{`${address.length}/49`}</span>
                        </div>
                        <input 
                            type="text" 
                            placeholder="填写地址"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            maxLength={49}
                        />
                    </div>
                    <div className="more-info-field single-line">
                        <label>电话</label>
                        <input 
                            type="text" 
                            placeholder="填写联系电话"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                </section>

                <section className="more-info-group">
                    <div className="more-info-field">
                        <div className="field-header">
                            <label>开户行</label>
                            <span className="char-counter">{`${bank.length}/49`}</span>
                        </div>
                        <input 
                            type="text" 
                            placeholder="填写开户行"
                            value={bank}
                            onChange={e => setBank(e.target.value)}
                            maxLength={49}
                        />
                    </div>
                    <div className="more-info-field single-line">
                        <label>开户行账号</label>
                        <input 
                            type="text" 
                            placeholder="填写开户行账号"
                            value={account}
                            onChange={e => setAccount(e.target.value)}
                        />
                    </div>
                </section>
                
                <section className="more-info-group">
                    <div className="more-info-field">
                        <div className="field-header">
                            <label>备注</label>
                            <span className="char-counter">{`${remarks.length}/80`}</span>
                        </div>
                        <textarea 
                            placeholder="该内容将会打印在发票上"
                            value={remarks}
                            onChange={e => setRemarks(e.target.value)}
                            maxLength={80}
                            rows={3}
                        ></textarea>
                    </div>
                </section>
            </main>

            <footer className="invoice-form-footer">
                <button className="submit-button" onClick={handleConfirm}>确定</button>
            </footer>
        </div>
    );
};

const InvoiceDetailPage = ({ totalAmount, selectedOrders, onBack }) => {
    const selectedCount = selectedOrders.length;
    return (
        <div className="invoice-details-page">
            <header className="invoice-form-header">
                <button onClick={onBack} className="invoice-header-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
                </button>
                <h1>发票详情</h1>
            </header>

            <main className="invoice-details-main">
                <section className="details-total-section">
                    <p>发票总额</p>
                    <div className="total-amount-display">
                        <span>{totalAmount.toFixed(2)}</span>
                        <span className="currency-unit">元</span>
                    </div>
                </section>
                
                <section className="details-list-section">
                    <div className="details-list-title">
                        订单总数{selectedCount}笔
                    </div>
                    {selectedOrders.map(order => (
                         <div key={order.id} className="details-invoice-card">
                            <div className="details-list-item">
                                <span>发票内容</span>
                                <span>*娱乐服务*{order.name}费</span>
                            </div>
                            <div className="details-list-item">
                                <span>开票方</span>
                                <span>某某有限公司</span>
                            </div>
                            <div className="details-list-item">
                                <span>发票金额</span>
                                <span className="item-amount">{order.amount.toFixed(2)}元</span>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};


const ConfirmationDrawer = ({ buyerName, taxId, headerType, email, idCardNumber, onConfirm, onClose }) => {
    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="confirmation-drawer" onClick={(e) => e.stopPropagation()}>
                <header className="drawer-header">
                    <h3 className="drawer-title">确认信息</h3>
                    <button className="drawer-close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </button>
                </header>
                <main className="drawer-content">
                    <div className="drawer-content-section">
                        <div className="drawer-info-row">
                            <span className="drawer-info-label">购方名称</span>
                            <span className="drawer-info-value">{buyerName}</span>
                        </div>
                        {headerType === 'individual' && idCardNumber && (
                             <div className="drawer-info-row">
                                <span className="drawer-info-label">身份证号</span>
                                <span className="drawer-info-value">{idCardNumber}</span>
                            </div>
                        )}
                        {headerType === 'corporate' && (
                             <div className="drawer-info-row">
                                <span className="drawer-info-label">购方税号</span>
                                <span className="drawer-info-value">{taxId}</span>
                            </div>
                        )}
                    </div>
                    <div className="drawer-content-section">
                        <div className="drawer-info-row">
                            <span className="drawer-info-label">电子邮箱</span>
                            <span className="drawer-info-value">{email}</span>
                        </div>
                    </div>
                </main>
                <footer className="drawer-footer">
                    <button className="drawer-confirm-btn" onClick={onConfirm}>确认提交</button>
                </footer>
            </div>
        </div>
    );
};

const mockWeChatHeaders = [
    { id: 1, buyerName: '某某科技有限公司', taxId: '91310000MA1FL2MX7B', type: 'corporate' },
    { id: 2, buyerName: '上海示例信息技术有限公司', taxId: '91310115MA1K395687', type: 'corporate' },
];

const WeChatInvoiceDrawer = ({ headers, onSelect, onClose }) => {
    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="wechat-invoice-drawer" onClick={(e) => e.stopPropagation()}>
                <header className="drawer-header">
                    <h3 className="drawer-title">选择发票抬头</h3>
                    <button className="drawer-close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </button>
                </header>
                <main className="wechat-drawer-content">
                    <div className="header-list">
                        {headers.map(header => (
                            <div key={header.id} className="header-item" onClick={() => onSelect(header)}>
                                <div className="header-item-info">
                                    <span className="header-item-name">{header.buyerName}</span>
                                    {header.taxId !== 'N/A' && <span className="header-item-taxid">{header.taxId}</span>}
                                </div>
                                 <div className={`custom-radio`}></div>
                            </div>
                        ))}
                    </div>
                </main>
                <footer className="wechat-drawer-footer">
                    <div className="wechat-auth-section">
                        <div className="wechat-auth-left">
                            <svg className="wechat-logo" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16,2C8.268,2,2,7.817,2,14.933c0,4.98,3.02,9.33,7.438,11.517l-1.3,4.55,4.868-2.6c1.62,0.55,3.356,0.85,5.132,0.85c7.732,0,14-5.817,14-12.933C30,7.817,23.732,2,16,2z M12.03,16.96c-1.356,0-2.455-1.1-2.455-2.454c0-1.356,1.1-2.455,2.455-2.455c1.354,0,2.454,1.1,2.454,2.455C14.484,15.86,13.384,16.96,12.03,16.96z M19.97,16.96c-1.356,0-2.455-1.1-2.455-2.454c0-1.356,1.1-2.455,2.455-2.455c1.354,0,2.454,1.1,2.454,2.455C22.424,15.86,21.324,16.96,19.97,16.96z" fill="#07C160"/></svg>
                            <span>微信发票助手</span>
                        </div>
                        <div className="wechat-auth-right authorized">
                            <span>已授权</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};


export const InvoicePage = ({ totalAmount, selectedOrders, onBack, onGoToHistory }) => {
    const [view, setView] = useState('form'); // 'form', 'details', 'moreInfo', 'success'
    const [headerType, setHeaderType] = useState('corporate');
    const [buyerName, setBuyerName] = useState('');
    const [taxId, setTaxId] = useState('');
    const [idCardNumber, setIdCardNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isConfirmDrawerVisible, setIsConfirmDrawerVisible] = useState(false);
    const [isWeChatDrawerVisible, setIsWeChatDrawerVisible] = useState(false);
    const [moreInfo, setMoreInfo] = useState({
        address: '',
        phone: '',
        bank: '',
        account: '',
        remarks: '',
    });
    
    const selectedCount = selectedOrders.length;
    const isSubmitDisabled = !buyerName.trim() || !email.trim() || (headerType === 'corporate' && !taxId.trim());

    const handleSaveMoreInfo = (data) => {
        setMoreInfo(data);
        setView('form');
    };

    const handleConfirmSubmit = () => {
        console.log("Submitting invoice...");
        setIsConfirmDrawerVisible(false);
        setView('success');
    };
    
    if (view === 'success') {
        return (
            <SubmissionSuccessPage
                onGoToHomepage={onBack}
                onGoToHistory={onGoToHistory}
            />
        );
    }
    
    if (view === 'details') {
        return (
            <InvoiceDetailPage
                totalAmount={totalAmount}
                selectedOrders={selectedOrders}
                onBack={() => setView('form')}
            />
        );
    }

    if (view === 'moreInfo') {
        return (
            <MoreInfoPage 
                initialData={moreInfo}
                onSave={handleSaveMoreInfo}
                onBack={() => setView('form')}
            />
        );
    }

    const filledMoreInfoCount = Object.values(moreInfo).filter(val => val.trim() !== '').length;

    return (
        <div className="invoice-form-page">
            <header className="invoice-form-header">
                <button onClick={onBack} className="invoice-header-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
                </button>
                <h1>开具发票</h1>
            </header>

            <main className="invoice-form-main">
                <section className="form-section">
                    <h2 className="section-title">发票详情</h2>
                    <div className="form-row">
                        <label>抬头类型</label>
                        <div className="radio-group">
                            <div className="radio-option" onClick={() => setHeaderType('corporate')}>
                                <div className={`custom-radio ${headerType === 'corporate' ? 'active' : ''}`}>
                                    {headerType === 'corporate' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>}
                                </div>
                                <span>企业单位</span>
                            </div>
                            <div className="radio-option" onClick={() => setHeaderType('non-corporate')}>
                                <div className={`custom-radio ${headerType === 'non-corporate' ? 'active' : ''}`}>
                                    {headerType === 'non-corporate' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>}
                                </div>
                                <span>非企业单位</span>
                            </div>
                             <div className="radio-option" onClick={() => setHeaderType('individual')}>
                                <div className={`custom-radio ${headerType === 'individual' ? 'active' : ''}`}>
                                    {headerType === 'individual' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>}
                                </div>
                                <span>个人</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <label>购方名称</label>
                        <div className="input-with-icon">
                            <input 
                                type="text" 
                                placeholder="请输入购方名称"
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
                             />
                             <button className="wechat-icon-btn" onClick={() => setIsWeChatDrawerVisible(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                            </button>
                        </div>
                    </div>
                    {headerType === 'individual' &&
                        <div className="form-row">
                            <label>身份证号</label>
                            <input 
                                type="text" 
                                placeholder="填写身份证号 (非必填)"
                                value={idCardNumber}
                                onChange={(e) => setIdCardNumber(e.target.value)}
                             />
                        </div>
                    }
                    {headerType === 'corporate' &&
                        <div className="form-row">
                            <label>购方税号</label>
                            <input 
                                type="text" 
                                placeholder="填写纳税人识别号"
                                value={taxId}
                                onChange={(e) => setTaxId(e.target.value)}
                             />
                        </div>
                    }
                    <div className="form-row" onClick={() => setView('moreInfo')} style={{ cursor: 'pointer' }}>
                         <label>更多内容</label>
                         <div className="placeholder-with-arrow">
                            <span>
                                {filledMoreInfoCount > 0 
                                    ? `已填写${filledMoreInfoCount}/5项` 
                                    : '填写备注、地址等 (非必填)'}
                            </span>
                            <span className="arrow-icon">&gt;</span>
                         </div>
                    </div>
                </section>

                <section className="form-section">
                    <div className="form-row">
                        <label>总金额</label>
                        <div className="amount-details">
                            <span className="total-amount">{totalAmount.toFixed(2)} 元</span>
                            <div className="details-link" onClick={() => setView('details')}>
                                共{selectedCount}笔, 查看详情 <span className="arrow-icon">&gt;</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="form-section">
                    <h2 className="section-title">接收方式</h2>
                    <div className="form-row">
                        <label>电子邮箱</label>
                        <input 
                            type="email" 
                            placeholder="请输入用于接收的电子邮箱"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </section>
            </main>

            <footer className="invoice-form-footer">
                <button 
                    className="submit-button" 
                    disabled={isSubmitDisabled} 
                    onClick={() => setIsConfirmDrawerVisible(true)}
                >
                    提交
                </button>
            </footer>

            {isConfirmDrawerVisible && (
                 <ConfirmationDrawer
                    buyerName={buyerName}
                    taxId={taxId}
                    headerType={headerType}
                    email={email}
                    idCardNumber={idCardNumber}
                    onConfirm={handleConfirmSubmit}
                    onClose={() => setIsConfirmDrawerVisible(false)}
                />
            )}
            {isWeChatDrawerVisible && (
                <WeChatInvoiceDrawer
                    headers={mockWeChatHeaders}
                    onClose={() => setIsWeChatDrawerVisible(false)}
                    onSelect={(header) => {
                        setBuyerName(header.buyerName);
                        setTaxId(header.taxId === 'N/A' ? '' : header.taxId);
                        setHeaderType(header.type);
                        setIsWeChatDrawerVisible(false);
                    }}
                />
            )}
        </div>
    );
};