<template lang="">
  <div class="filter__condition" :style="{top: (coord?.top + coord?.height + 1)+'px', left: (coord?.right - 130)+'px'}">
    <div class="condition__middle">
        <div class="condition__middle--header">
            <span>Lọc theo {{title}}</span>
            <div @click="showConditionMenu">
                <span>{{conditonText || items[0].title}}</span>
                <i class="icofont-rounded-down"></i>
            </div>
            <div class="condition--option" v-show="showOption">
                <div class="option--item" v-for="item in items" :key="item.id" @click="chooseCondition" :data-value="item.value">{{item.title}}</div>
            </div>
        </div>
        <input type="text" class="primary-input" v-model="conditonValue">
        <div class="flex justify-between">
            <button class="btn btn--secondary">Hủy</button>
            <button class="btn btn--primary" @click="filterSubmit">Lọc</button>
        </div>
    </div>
    <div class="condition__bottom"></div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import {CONDITION_FILTERS} from "../../Enums/Enums"
export default {
    data() {
        return {
            textFilter: [
                {
                    id: 1,
                    title: "Bằng",
                    value: "="
                },
                {
                    id: 7,
                    title: "Bắt đầu bằng",
                    value: "startWith"
                },
                {
                    id: 8,
                    title: "Kết thúc bằng",
                    value: "endWith"
                },
                {
                    id: 9,
                    title: "Chứa",
                    value: "like"
                },
                {
                    id: 10,
                    title: "Không chứa",
                    value: "not like"
                },
                {
                    id: 11,
                    title: "Trống",
                    value: "is null"
                },
                {
                    id: 12,
                    title: "Không trống",
                    value: "is not null"
                }
            ],
            numberFilter: [
                {
                    id: 1,
                    title: "Bằng",
                    value: "="
                },
                {
                    id: 2,
                    title: "Không bằng",
                    value: "!="
                },
                {
                    id: 3,
                    title: "Lớn hơn",
                    value: ">"
                },
                {
                    id: 4,
                    title: "Lớn hơn hoặc bằng",
                    value: ">="
                },
                {
                    id: 5,
                    title: "Nhỏ hơn",
                    value: "<"
                },
                {
                    id: 6,
                    title: "Nhỏ hơn hoặc bằng",
                    value: "<="
                },
                {
                    id: 11,
                    title: "Trống",
                    value: "is null"
                },
                {
                    id: 12,
                    title: "Không trống",
                    value: "is not null"
                }
            ],
            items: null,
            conditonText: null,
            showOption: false,
            typeConditon: "=",
            conditonValue:"",
        }
    },
    computed: {
        ...mapMutations(['setFilterCondition'])
    },
    props: {
        name: {
            type: String,
            default: 'ABC'
        },
        title: {
            type:String,
        },
        typeFilter: {
            type: Number,
        },
        coord: {
            type:Object,
        },
    },
    methods: {
        changeItems() {
            switch (this.typeFilter) {
                case CONDITION_FILTERS.STRING:
                    this.items = this.textFilter;
                    break;
                case CONDITION_FILTERS.NUMBER:
                    this.items = this.numberFilter;
                    break;
                case CONDITION_FILTERS.DATE:
                    this.items = this.dateFilter;
                    break;
            }
        },
        chooseCondition(event) {
            this.conditonText = event.target.innerText;
            this.typeConditon = event.target.dataset.value;
            this.showOption = false;
        },
        showConditionMenu() {
            this.showOption = !this.showOption;
        },
        filterSubmit() {
            if (this.typeConditon == "startWith") {
                this.$store.commit("setFilterCondition", {
                    ...this.$store.state.filterCondition,
                    [this.name]: 'like'+' ' + `${this.conditonValue}%`
                })
            } else if (this.typeConditon == "endWith") {
                this.$store.commit("setFilterCondition", {
                    ...this.$store.state.filterCondition,
                    [this.name]: 'like' + ' ' + `%${this.conditonValue}`
                })
            } else if (this.typeConditon == "like") {
                this.$store.commit("setFilterCondition", {
                    ...this.$store.state.filterCondition,
                    [this.name]: this.typeConditon + ' ' + `%${this.conditonValue}%`
                })
            } else if (this.typeConditon == "is null") {
                this.$store.commit("setFilterCondition", {
                    ...this.$store.state.filterCondition,
                    [this.name]: this.typeConditon
                })
            } else if (this.typeConditon == "is not null") {
                this.$store.commit("setFilterCondition", {
                    ...this.$store.state.filterCondition,
                    [this.name]: this.typeConditon
                })
            } else {
                this.$store.commit("setFilterCondition", {
                    ...this.$store.state.filterCondition,
                    [this.name]: this.typeConditon + ' ' + `${this.conditonValue}`
                })
            }
            this
            console.log({...this.$store.state.filterCondition, pageNumber: this.$store.state.pageNumber, pageSize: this.$store.state.pageSize});
        }
    },
    created() {
        this.changeItems();
    },
};
</script>
<style lang="css" scoped>
.filter__condition {
  padding: 22px 17px;
  display: flex;
  flex-direction: column;
  gap: 16px 0;
  width: 400px;
  font-size: 13px;
  position: fixed;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 4;
  background: #fff;
}
.condition__middle {
    display: flex;
    flex-direction: column;
    gap: 16px 0;
}

.condition__middle--header {
    display: flex;
    justify-content: space-between;
    position: relative;
}
.condition--option {
    width: 50%;
    position: absolute;
    top: 100%;
    right: 0;
    font-size: 13px;
    background: #fff;
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.option--item {
    padding: 4px 10px;
    cursor: pointer;
}
.option--item:hover {
    background: #dedede;
    color: var(--primary-color);
}
</style>
