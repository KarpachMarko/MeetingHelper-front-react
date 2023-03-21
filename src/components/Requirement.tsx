import React, {useContext, useEffect, useMemo, useState} from "react";
import {IRequirement} from "../domain/entity/IRequirement";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../state/AppContext";
import {RequirementParametersService} from "../services/RequirementParametersService";
import {IRequirementParameter} from "../domain/entity/IRequirementParameter";
import {PriorityIcon} from "./PriorityIcon";
import moment from "moment";
import {EditMenu} from "./EditMenu";
import {ConfirmDialog} from "./ConfirmDialog";
import {RequirementsService} from "../services/RequirementsService";
import {PaymentsService} from "../services/PaymentsService";
import {IPayment} from "../domain/entity/IPayment";
import {Guests} from "./Guests";
import {IGuest} from "../domain/model/IGuest";
import {RequirementUsersService} from "../services/RequirementUsersService";
import {UsersService} from "../services/UsersService";
import {getRequirementRoleName} from "../enum/GuestStatus";
import {VerificationService} from "../services/VerificationService";
import {BasicButton} from "./BasicButton";
import {inList} from "./GuestsList";
import {AnimatePresence, motion} from "framer-motion";

export const Requirement = (props: { requirement: IRequirement }) => {

    const navigate = useNavigate();
    const appState = useContext(AppContext);
    const requirementsService = useMemo(() => new RequirementsService(appState), [appState]);
    const requirementParametersService = useMemo(() => new RequirementParametersService(appState), [appState]);
    const requirementUsersService = useMemo(() => new RequirementUsersService(appState), [appState]);
    const paymentsService = useMemo(() => new PaymentsService(appState), [appState]);
    const usersService = useMemo(() => new UsersService(appState), [appState]);

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [reloadData, setReloadData] = useState(false);

    const [parameters, setParameters] = useState([] as IRequirementParameter[])
    const [payments, setPayments] = useState([] as IPayment[])
    const [guests, setGuests] = useState([] as IGuest[])

    useEffect(() => {
        const fetchRequirements = async () => {
            setReloadData(false)
            if (props.requirement.id == null) {
                return;
            }
            const response = await requirementParametersService.getRequirementParameters(props.requirement.id);
            if (response.status < 300 && response.data !== undefined) {
                setParameters(response.data);
            }
        }
        const fetchPayments = async () => {
            if (props.requirement.id == null) {
                return;
            }
            const response = await paymentsService.getRequirementPayments(props.requirement.id);
            if (response.status < 300 && response.data !== undefined) {
                setPayments(response.data);
            }
        }
        const fetchGuests = async () => {
            const response = await requirementUsersService.getRequirementUsers(props.requirement.id!);
            if (response.status < 300 && response.data !== undefined) {
                const result: IGuest[] = [];
                for (const meetingUser of response.data) {
                    const user = (await usersService.get(meetingUser.userId)).data;
                    if (user != null) {
                        result.push({user: user, role: getRequirementRoleName(meetingUser.role), priority: 2})
                    }
                }
                setGuests(result);
            }
        }
        fetchRequirements().catch(console.error);
        fetchPayments().catch(console.error)
        fetchGuests().catch(console.error)

    }, [paymentsService, props.requirement.id, requirementParametersService, requirementUsersService, usersService, reloadData]);

    function deleteEvent(eventId: string): void {
        requirementsService.delete(eventId).then(() =>
            navigate(0)
        )
    }

    function getBudgetSpentPercent(): number {
        const totalSpent = payments.map(val => val.amount).reduce((prev, cur) => prev + cur, 0);
        if (totalSpent > props.requirement.budgetPerPerson) {
            return 100;
        } else {
            return totalSpent / props.requirement.budgetPerPerson * 100;
        }
    }

    async function join(): Promise<void> {
        if (!VerificationService.verify()) {
            return;
        }
        const userId = await usersService.getCurrentUserId();
        if (props.requirement.id != null) {
            requirementUsersService.add({userId: userId, requirementId: props.requirement.id, role: 1}).then(() => {
                setReloadData(true);
            })
        }
    }

    async function leave(): Promise<void> {
        if (!VerificationService.verify()) {
            return;
        }
        const myTelegramId = window.Telegram.WebApp.initDataUnsafe.user?.id;
        if (myTelegramId == null) {
            return;
        }
        const currentUser = guests.find(guest => guest.user.telegramId === myTelegramId.toString());
        if (currentUser?.user?.id != null) {
            const requirementUsers = (await requirementUsersService.getAll()).data ?? [];
            const reqUserId = requirementUsers.find(value => value.userId === currentUser.user.id && value.requirementId === props.requirement.id)?.id ?? ""
            requirementUsersService.delete(reqUserId).then(() => {
                setReloadData(true);
            });
        }
    }

    return (
        <div className="h-full relative mt-10">

            <div className={"absolute -top-16 w-full"}>
                <Guests guests={guests} buttonSets={[
                    {
                        condition: (guests) => !inList(guests),
                        buttons: [<BasicButton text={"Join"} action={join} background={"colored"}/>]
                    },
                    {
                        condition: inList,
                        buttons: [<BasicButton text={"Leave"} action={leave} color={"red"} background={"gray"}/>]
                    }
                ]}/>
            </div>

            <div className="max-w-xs mx-auto">
                <div className="flex flex-col h-full bg-white shadow-lg rounded-lg">

                    <div className="relative flex-grow flex flex-col p-5">
                        <div className="absolute top-0 left-0 w-full bg-gray-200 rounded-t-full h-1.5 dark:bg-gray-700">
                            <div className="bg-indigo-500 h-1.5 rounded-t-full dark:bg-blue-500"
                                 style={{width: `${getBudgetSpentPercent()}%`}}></div>
                        </div>

                        <div
                            className="absolute -top-3 right-2 rounded-full bg-indigo-500 text-white font-bold shadow-md">
                            <span className="px-4 py-2">{props.requirement.budgetPerPerson}$</span>
                        </div>

                        <div className="flex-grow">
                            <header className="mb-3 flex justify-between gap-5">
                                <h3 className="text-[22px] text-gray-900 font-extrabold leading-snug">{props.requirement.title}</h3>
                            </header>
                            <div className="mb-2">
                                <p>{props.requirement.description}</p>
                            </div>
                        </div>

                        <div
                            className="w-full text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <span className="font-light">Parameters:</span>
                            <AnimatePresence>
                                {parameters.sort((a, b) => b.priority - a.priority).map((value, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{scale: 0.8, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        className={`inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 ${index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-50"} hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white gap-2`}>
                                        <div className={"h-full w-4"}>
                                            <PriorityIcon priority={value.priority}/>
                                        </div>
                                        {value.parameterDesc}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <hr className="mb-3"/>

                        <div className="flex flex-col items-center space-x-2">
                            <span
                                className="font-light text-gray-500">Deadline: {moment(props.requirement.decisionDate).format("DD.MM")}</span>
                        </div>

                        <div className={"flex justify-center gap-2"}>
                            <BasicButton
                                text={"Show options"}
                                background={"none"}
                                action={() => navigate(`${props.requirement.id}/options`)}
                            />
                        </div>

                        <EditMenu items={[
                            {
                                icon: "edit", action: () => {
                                    navigate(`${props.requirement.id}`)
                                }
                            },
                            {
                                icon: "delete", action: () => {
                                    setDeleteDialog(true)
                                }
                            }
                        ]}/>
                        {deleteDialog ?
                            <ConfirmDialog title={"Delete requirement"}
                                           text={"Do you really want to delete this requirement?"}
                                           acceptText={"Delete"}
                                           cancelText={"Cancel"}
                                           acceptAction={async () => {
                                               await deleteEvent(props.requirement.id!)
                                           }}
                                           cancelAction={() => setDeleteDialog(false)}/>
                            : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}