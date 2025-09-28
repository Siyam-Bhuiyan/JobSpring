import { Badge, Text, Avatar, Divider, Button } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconCalendar,
  IconCalendarMonth,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const JobHistoryCard = (props: any) => {
  return (
    <Link to={`/job-details/${props.id}`} className="block no-underline">
      <div
        className="flex-4 cursor-pointer 
                  height-96 width-96
                  bg-mine-shaft-900 rounded-2xl p-6 shadow-md 
                  hover:border border-bright-sun-400
                 "
      >
        {/* Top Section */}
        <div className="flex justify-between mb-10">
          <div className="flex gap-4">
            <Avatar src={props.logo} size={40} radius="7" />
            <div>
              <div className="text-lg font-semibold">{props.jobTitle}</div>
              <Text size="sm" className="text-gray-500">
                {props.company} • {props.applicants} Applicants
              </Text>
            </div>
          </div>
          {props.saved ? (
            <IconBookmarkFilled className="text-bright-sun-400 cursor-pointer" />
          ) : (
            <IconBookmark className="text-gray-400 hover:text-blue-500 cursor-pointer" />
          )}
        </div>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Badge color="violet" radius="sm" variant="filled">
            {props.experience}
          </Badge>
          <Badge color="blue" radius="sm" variant="filled">
            {props.jobType}
          </Badge>
          <Badge color="teal" radius="sm" variant="filled">
            {props.location}
          </Badge>
        </div>

        {/* Description */}
        <div className="text-gray-400 text-sm line-clamp-2 mb-8">
          {props.description}
        </div>
        <div className="mt-20">
          <Divider size="xs" mx="md" />
          <Divider size="xs" mx="md" />
          {/* Bottom Section */}
          <div className="mt-3 flex justify-between bottom-6 ">
            <Text className="font-bold text-lg text-blue-600">
              {props.salary}
            </Text>
            <div className="flex gap-4">
              <IconCalendar size={16} className="text-gray-400" />
              <Text size="sm" className="text-gray-400">
                {props.applied || props.interviewing
                  ? "Applied "
                  : props.offered
                  ? "Interviewed "
                  : "Posted "}{" "}
                {props.posted}
              </Text>
            </div>
          </div>
        </div>
        {(props.offered || props.interviewing) && (
          <Divider size="xs" mx="md" className="mt-3" />
        )}
        {props.offered && (
          <div className="flex gap-2 mt-3">
            <div
              className="flex-1 
                 transition-transform duration-500 ease-in-out
                 hover:shadow-xl hover:scale-105"
            >
              <Button variant="outline" color="green" fullWidth>
                Accept
              </Button>
            </div>
            <div
              className="flex-1 
                 transition-transform duration-500 ease-in-out
                 hover:shadow-xl hover:scale-105"
            >
              <Button variant="light" color="green" fullWidth>
                Reject
              </Button>
            </div>
          </div>
        )}
        {props.interviewing && (
          <div className="flex gap-1 text-sm items-center mt-3">
            <IconCalendarMonth
              className="text-bright-sun-400 w-5 h-5"
              stroke={1.5}
            />{" "}
            Sun, 25 August &bull;{" "}
            <span className="text-mine-shaft-400">10:00 AM</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default JobHistoryCard;
