package com.haulu.backend.core.domain.model.payload.request;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserQueryByIdsRequest {
    private List<Long> ids;
}
