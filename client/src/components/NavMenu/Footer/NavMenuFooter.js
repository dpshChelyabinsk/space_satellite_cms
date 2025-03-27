import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import getContacts from '../../../api/contacts/getContacts';

import SmallNavLink from "./SmallNavLink";
import {
    StyledWrapperFooter,
    StyledMenuFooter,
    StyledWrapperAll,
    StyledWrapperBox,
    StyledWrapperCredits,
    SlyledContacts,
    HeaderContacts,
} from './FooterStyles';

import ExternalAnchor from "./ExternalAnchor";
import TelegramLogotype from "../../Logotypes/TelegramLogotype";
import VkLogotype from "../../Logotypes/VkLogotype";
import YouTubeLogotype from "../../Logotypes/YouTubeLogotype";
import WhatsAppLogotype from "../../Logotypes/WhatsAppLogotype";
import ExternalSocial from "./ExternalSocial";

const NavMenuFooter = () => {
    const location = useLocation();
    const [contacts, setContacts] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            const data = await getContacts();
            setContacts(data);
        };
        fetchContacts();
    }, []);

    if (!contacts) return null; // можно заменить на спиннер

    return (
        <StyledWrapperFooter>
            <StyledMenuFooter>
                <StyledWrapperAll>
                    <StyledWrapperBox>
                        <SmallNavLink dir="/satellite" location={location}>Отследить спутник</SmallNavLink>
                        <SmallNavLink dir="/events" location={location}>Мероприятия</SmallNavLink>
                        <SmallNavLink dir="/albums" location={location}>Галерея</SmallNavLink>
                        <SmallNavLink dir="/news" location={location}>Новости</SmallNavLink>
                        <SmallNavLink dir="/about" location={location}>О нас</SmallNavLink>
                    </StyledWrapperBox>
                    <StyledWrapperBox>
                        <ExternalAnchor hovered={true} href={contacts.address.href} target="_blank" rel="noopener noreferrer">{contacts.address.label}</ExternalAnchor>
                        <ExternalAnchor hovered={true} href={contacts.site.href} target="_blank" rel="noopener noreferrer">{contacts.site.label}</ExternalAnchor>
                        <ExternalAnchor hovered={true} href={contacts.tel.href} rel="noopener noreferrer">{contacts.tel.label}</ExternalAnchor>
                        <ExternalAnchor hovered={true} href={contacts.email.href} target="_blank" rel="noopener noreferrer">{contacts.email.label}</ExternalAnchor>
                    </StyledWrapperBox>
                    <StyledWrapperBox>
                        <HeaderContacts>Наши соц сети:</HeaderContacts>
                        <SlyledContacts>
                            <ExternalSocial hovered={true} href={contacts.telegram.href} target="_blank"><TelegramLogotype /></ExternalSocial>
                            <ExternalSocial hovered={true} href={contacts.vk.href} target="_blank"><VkLogotype /></ExternalSocial>
                            <ExternalSocial hovered={true} href={contacts.youtube.href} target="_blank"><YouTubeLogotype /></ExternalSocial>
                            <ExternalSocial hovered={true} href={contacts.whatsapp.href} target="_blank"><WhatsAppLogotype /></ExternalSocial>
                        </SlyledContacts>
                    </StyledWrapperBox>
                </StyledWrapperAll>
                <StyledWrapperCredits>
                    Дворец Пионеров Школьников {new Date().getFullYear()}г
                </StyledWrapperCredits>
            </StyledMenuFooter>
        </StyledWrapperFooter>
    );
};

export default NavMenuFooter;
