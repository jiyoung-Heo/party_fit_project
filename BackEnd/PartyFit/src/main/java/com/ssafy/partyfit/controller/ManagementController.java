package com.ssafy.partyfit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMember;
import com.ssafy.partyfit.model.dto.PartyMemberUser;
import com.ssafy.partyfit.model.service.MeetService;
import com.ssafy.partyfit.model.service.PartyMemberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/party/{partyId}/management")
public class ManagementController {
	Logger logger = LoggerFactory.getLogger(getClass());
	private final int WAIT_TO_JOIN = 0;

	PartyMemberService partymemberService;
	MeetService meetService;

	public ManagementController(Logger logger, PartyMemberService partymemberService, MeetService meetService) {
		super();
		this.logger = logger;
		this.partymemberService = partymemberService;
		this.meetService = meetService;
	}

	@GetMapping("/join")
	public ResponseEntity<?> showJoinList(@PathVariable("partyId") String partyId) {
		Map<String, Object> map = new HashMap<>();
		map.put("partyId", partyId);
		map.put("status", WAIT_TO_JOIN);
		List<PartyMemberUser> checkMemberList = partymemberService.showPartyMember(map);
		if (checkMemberList == null || checkMemberList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<PartyMemberUser>>(checkMemberList, HttpStatus.OK);
		}
	}

	@PutMapping("/join/{isAccept}")
	public ResponseEntity<?> clickArticleLikes(@PathVariable("partyId") int partyId,
			@PathVariable("isAccept") Boolean isaccept, @RequestBody PartyMember partyMember) {
		partyMember.setPartyId(partyId);

		int result = partymemberService.managePartyMember(partyMember, isaccept);

		if (result == 0) {
			// 업데이트할 데이터가 없다면
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			// 데이터를 성공적으로 업데이트한 경우
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	@PutMapping("/meet/{meetId}/{isAccept}")
	public ResponseEntity<?> participationMmeet(@PathVariable("meetId") int meetId,
			@PathVariable("isAccept") Boolean isaccept) {

		int result = meetService.manageCreateMeet(meetId, isaccept);

		if (result == 0) {
			// 업데이트할 데이터가 없다면
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			// 데이터를 성공적으로 업데이트한 경우
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

}