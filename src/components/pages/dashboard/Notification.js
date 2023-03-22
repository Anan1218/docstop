import {useEffect, useRef, useState} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';

// project import
import MainCard from '../../notiComponents/MainCard';
import Transitions from '../../notiComponents/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined } from '@ant-design/icons';

// sx styles
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};

const NotificationContent = ({notificationInfo, onClickCallback}) => {
    // TODO: Avatar icon
    return (
      <>
        <ListItemButton onClick={() => {onClickCallback()}} sx={notificationInfo.read ? {bgcolor: 'lightgray'} : {}}>
          <ListItemAvatar>
              <Avatar
                sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                }}
              >
                  C
              </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={notificationInfo.title}
            secondary={notificationInfo.body}
          />
          <ListItemSecondaryAction>
              <Typography variant="caption" noWrap>
                  {/*{time}*/}
                  {notificationInfo.createdAt}
              </Typography>
          </ListItemSecondaryAction>
        </ListItemButton>
        <Divider />
      </>
    )
}

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    // Notification api -----
    const [notifContents, setNotifContents] = useState([]);
    const [hasMoreHistory, setHasMoreHistory] = useState(false);

    const setNotificationAsRead = async (idx) => {
        if (notifContents[idx].read) return;  // stop if notification is already read
        let queryUrl = `${process.env.REACT_APP_BASE_URL}/api/notification/${notifContents[idx].id}`;
        const res = await fetch(queryUrl, {
            method: 'GET',
            credentials: 'include',
        }).then(r => r.json());
        console.log("Read notification", res);

        // Update content state
        const newNotifContents = notifContents.map((c, i) => {
            return i === idx ? {...c, read: true} : c;
        });
        setNotifContents(newNotifContents);
    }

    const fetchMoreDataInHistory = async () => {
        let lastDate = new Date(notifContents[notifContents.length - 1].createdAt);
        lastDate.setMinutes(lastDate.getMinutes() - lastDate.getTimezoneOffset());
        console.log(lastDate.toISOString());
        let queryUrl = `${process.env.REACT_APP_BASE_URL}/api/notification?dateTimeBefore=${lastDate.toISOString()}`;
        const res = await fetch(queryUrl, {
            method: 'GET',
            credentials: 'include',
        }).then(r => r.json());
        console.log(res);

        const originalContent = [...notifContents];
        if (originalContent[originalContent.length - 1].id === res.data[0].id)
            originalContent.pop();
        const newContent = originalContent.concat(res.data);
        setNotifContents(newContent);
        setHasMoreHistory(res.hasNext);
    }

    useEffect(() => {
        const notificationFetchInterval = 5000;
        let timerHandler;

        const fetchNotification = async (lastTime) => {
            if (lastTime) console.log("Getting notification at: " + lastTime.toISOString());
            let queryUrl = `${process.env.REACT_APP_BASE_URL}/api/notification`;
            if (lastTime !== null) {
                queryUrl += `?dateTimeAfter=${lastTime.toISOString()}`
            }
            const res = await fetch(queryUrl, {
                method: 'GET',
                credentials: 'include',
            }).then(r => r.json());

            // Update data
            console.log(res.data);
            if (res.data.length > 0) {
                setNotifContents(content => [...res.data, ...content])
            }
            if (lastTime === null) {
               // Check if we have more notifications to read in history for the first call
               if (res.hasNext) setHasMoreHistory(true);
            }

            // call fetch notifications in interval
            if (lastTime === null) {
                lastTime = new Date();
                lastTime.setMinutes(lastTime.getMinutes() - lastTime.getTimezoneOffset());
            }
            else {
                lastTime.setSeconds(lastTime.getSeconds() + notificationFetchInterval / 1000);
            }
            timerHandler = setTimeout(() => {
                fetchNotification(lastTime);
            }, notificationFetchInterval);
        };
        fetchNotification(null);

        return () => {
            console.log("Clearing notification timer handler")
            clearTimeout(timerHandler);
        };
    }, [])

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                color="secondary"
                sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Badge badgeContent={notifContents.filter(c => !c.read).length} color="primary">
                    <BellOutlined />
                </Badge>
            </IconButton>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? -5 : 0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: 3,
                                width: '100%',
                                minWidth: 285,
                                maxWidth: 420,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285
                                }
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="Notification"
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <IconButton size="small" onClick={handleToggle}>
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            '& .MuiListItemButton-root': {
                                                py: 0.5,
                                                '& .MuiAvatar-root': avatarSX,
                                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                            }
                                        }}
                                    >
                                        {notifContents.map((content, idx) => (
                                            <NotificationContent notificationInfo={content} onClickCallback={() => {setNotificationAsRead(idx)}} key={idx} />
                                        ))}
                                        <ListItemButton disabled={!hasMoreHistory} onClick={() => {fetchMoreDataInHistory();}} sx={{ textAlign: 'center', py: `${12}px !important` }}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" color="primary">
                                                        View More
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Notification;
