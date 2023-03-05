import {Page} from "../../components/Page";
import {BackBtn} from "../../components/backBtn";
import {useNavigate, useParams} from "react-router-dom";
import {Table} from "../../components/Table";
import {MoneyTransferCard} from "../../components/MoneyTransferCard";
import {IMoneyTransfer} from "../../domain/entity/IMoneyTransfer";
import {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {UsersService} from "../../services/UsersService";
import {PaymentsService} from "../../services/PaymentsService";
import {MoneyTransfersService} from "../../services/MoneyTransfersService";
import {IPayment} from "../../domain/entity/IPayment";
import {IUser} from "../../domain/entity/IUser";
import moment from "moment";
import {RequirementsService} from "../../services/RequirementsService";

export const MoneyTransfers = () => {
    const navigate = useNavigate();

    const {meetingId} = useParams();

    const appState = useContext(AppContext);
    const paymentsService = useMemo(() => new PaymentsService(appState), [appState]);
    const requirementsService = useMemo(() => new RequirementsService(appState), [appState]);
    const moneyTransfersService = useMemo(() => new MoneyTransfersService(appState), [appState]);
    const usersService = useMemo(() => new UsersService(appState), [appState]);

    const [rows, setRows] = useState([] as JSX.Element[][]);
    const [transfers, setTransfers] = useState([] as IMoneyTransfer[]);
    const [debts, setDebts] = useState([] as IMoneyTransfer[]);

    const formatTime = (dateStr: string) => {
        const date = moment(dateStr);
        return date.format("DD.MM HH:mm")
    }

    useEffect(() => {
        const fetchPayments = async () => {
            const payments = (await paymentsService.getMeetingPayments(meetingId!)).data ?? [];
            setRows(await getPaymentRows(payments));
            // const user = (await moneyTransfersService.getMeetingTransfers()).data;
        }
        const fetchTransfers = async () => {
            const transfers = (await moneyTransfersService.getMeetingMoneyTransfers(meetingId!)).data ?? [];
            setTransfers(transfers);
        }
        const fetchDebts = async () => {
            const debtsTransfers = (await moneyTransfersService.getDebtsMoneyTransfers(meetingId!)).data ?? [];
            setDebts(debtsTransfers);
        }
        fetchPayments().catch(console.error);
        fetchTransfers().catch(console.error);
        fetchDebts().catch(console.error);

    }, [paymentsService, moneyTransfersService, meetingId])

    const headerRows = [
        <div className="font-semibold text-left">Payer</div>,
        <div className="font-semibold text-left">Description</div>,
        <div className="font-semibold text-left">Amount</div>,
        <div className="font-semibold text-center">Date</div>
    ]

    interface IPayer extends IUser {
        photo?: string
    }

    async function getPayer(userId: string): Promise<IPayer | undefined> {
        const user = (await usersService.get(userId)).data;
        const photoURL = await usersService.getUserPhotoUrl(userId);
        if (user != null) {
            return {...user, photo: photoURL}
        }
        return undefined;
    }

    async function getPaymentRows(payments: IPayment[]): Promise<JSX.Element[][]> {
        const rows = [];
        for (const payment of payments) {
            const payer = await getPayer(payment.userId);
            const row = [
                <div className="flex items-center">
                    {payer?.photo === undefined ? <></> :
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full"
                                 src={payer.photo}
                                 width="40" height="40" alt={payer.fullName}/>
                        </div>
                    }
                    <div className="font-medium text-gray-800">{payer?.fullName ?? payment.userId}</div>
                </div>,
                <div
                    className="text-left">{(await requirementsService.get(payment.requirementId)).data?.title ?? payment.requirementId}</div>,
                <div className="text-left font-medium text-green-500">${payment.amount}</div>,
                <div className="text-center">{formatTime(payment.timestamp)}</div>
            ]
            rows.push(row);
        }
        return rows;
    }

    return (
        <Page
            name={"Money Transfers"}
            backBtn={<BackBtn text={"Back to meetings"} action={() => {
                navigate(`/meetings`)
            }}/>}
        >
            <div className={"flex flex-col items-center gap-5"}>
                <Table tableName={"Transactions"} headerRow={headerRows} rows={rows}/>

                <div className={"text-lg text-gray-500 border-b-2 border-gray-200"}>Transfers</div>
                <div className={"flex flex-wrap justify-center gap-5"}>
                    {transfers.map((value, index) => {
                        return (
                            <MoneyTransferCard key={index} moneyTransfer={value}/>
                        )
                    })}
                </div>

                <div className={"text-lg text-gray-500 border-b-2 border-gray-200"}>Debts</div>
                <div className={"flex flex-wrap justify-center gap-5"}>
                    {debts.map((value, index) => {
                        return (
                            <MoneyTransferCard key={index} moneyTransfer={value}/>
                        )
                    })}
                </div>
            </div>
        </Page>
    )
}